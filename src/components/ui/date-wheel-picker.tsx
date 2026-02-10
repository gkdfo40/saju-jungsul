import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* =========================================================================
   WheelColumn — iOS 스타일 순환 스크롤 휠 (성능 최적화)
   - visualIndex를 ref로 관리, DOM 직접 조작으로 리렌더 최소화
   - WheelItem을 React.memo로 분리하여 불필요한 리렌더 방지
   ========================================================================= */

const ITEM_HEIGHT = 40;
const VISIBLE_COUNT = 5;
const HALF = Math.floor(VISIBLE_COUNT / 2);
const COPIES = 3;

/* ----- WheelItem (memo) ----- */

interface WheelItemProps {
  label: string;
  absIndex: number;
  onClick: (absIndex: number) => void;
}

const WheelItem = React.memo(function WheelItem({
  label,
  absIndex,
  onClick,
}: WheelItemProps) {
  return (
    <div
      data-wheel-index={absIndex}
      className="wheel-item flex items-center justify-center font-primary select-none"
      style={{
        height: ITEM_HEIGHT,
        opacity: 0.2,
        transform: "scale(0.85)",
        fontSize: "15px",
        fontWeight: 400,
      }}
      onClick={() => onClick(absIndex)}
    >
      {label}
    </div>
  );
});

/* ----- WheelColumn ----- */

interface WheelColumnProps {
  items: { value: number; label: string }[];
  value: number;
  onChange: (value: number) => void;
}

const WheelColumn = React.memo(function WheelColumn({
  items,
  value,
  onChange,
}: WheelColumnProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isUserScrolling = React.useRef(false);
  const scrollTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const isResetting = React.useRef(false);

  // 드래그 상태
  const isDragging = React.useRef(false);
  const dragStartY = React.useRef(0);
  const dragStartScroll = React.useRef(0);
  const lastMoveY = React.useRef(0);
  const lastMoveTime = React.useRef(0);
  const velocity = React.useRef(0);
  const momentumRaf = React.useRef<number>(0);

  const count = items.length;
  const midOffset = count; // 두 번째 세트 시작

  // ref 기반 visualIndex (리렌더 없이 DOM 직접 업데이트)
  const visualIndexRef = React.useRef(
    Math.max(
      0,
      items.findIndex((item) => item.value === value)
    )
  );
  const prevVisualRef = React.useRef(-1);

  // 전체 아이템에서의 절대 인덱스 → 원본 인덱스
  const toLogical = React.useCallback(
    (absIdx: number) => ((absIdx % count) + count) % count,
    [count]
  );

  // DOM 직접 스타일 적용 (리렌더 없음)
  const applyVisualStyles = React.useCallback(
    (force = false) => {
      const el = containerRef.current;
      if (!el) return;
      const vi = visualIndexRef.current;
      if (!force && vi === prevVisualRef.current) return;
      prevVisualRef.current = vi;

      const children = el.querySelectorAll<HTMLElement>(".wheel-item");
      children.forEach((child) => {
        const absIndex = Number(child.dataset.wheelIndex);
        const logical = toLogical(absIndex);
        const distance = Math.abs(logical - vi);
        const circDist = Math.min(distance, count - distance);
        const isCenter = circDist === 0;

        child.style.opacity = isCenter ? "1" : circDist === 1 ? "0.4" : "0.2";
        child.style.transform = `scale(${
          isCenter ? 1 : circDist === 1 ? 0.9 : 0.85
        })`;
        child.style.fontSize = isCenter ? "18px" : "15px";
        child.style.fontWeight = isCenter ? "900" : "400";
      });
    },
    [count, toLogical]
  );

  // 스크롤 위치에서 visualIndex 갱신 + DOM 스타일 적용
  const updateVisualIndex = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const absIdx = Math.round(el.scrollTop / ITEM_HEIGHT);
    visualIndexRef.current = toLogical(absIdx);
    applyVisualStyles();
  }, [toLogical, applyVisualStyles]);

  // 값을 기반으로 중간 세트의 해당 위치로 스크롤
  const scrollToValue = React.useCallback(
    (val: number, smooth = false) => {
      const el = containerRef.current;
      if (!el) return;
      const idx = items.findIndex((item) => item.value === val);
      if (idx === -1) return;
      const target = (midOffset + idx) * ITEM_HEIGHT;
      if (smooth) {
        el.scrollTo({ top: target, behavior: "smooth" });
      } else {
        el.scrollTop = target;
      }
      visualIndexRef.current = idx;
      applyVisualStyles();
    },
    [items, midOffset, applyVisualStyles]
  );

  // 경계에 가까워지면 중간 세트로 무소음 리셋
  const resetToMiddle = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const absIdx = Math.round(el.scrollTop / ITEM_HEIGHT);
    const logical = toLogical(absIdx);
    if (absIdx < count * 0.5 || absIdx >= count * 2.5) {
      isResetting.current = true;
      el.scrollTop = (midOffset + logical) * ITEM_HEIGHT;
      requestAnimationFrame(() => {
        isResetting.current = false;
      });
    }
  }, [count, midOffset, toLogical]);

  // 초기 마운트 — 페인트 전에 위치 + 스타일 적용
  React.useLayoutEffect(() => {
    scrollToValue(value);
    applyVisualStyles(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 외부 value 변경
  React.useEffect(() => {
    if (isUserScrolling.current) return;
    scrollToValue(value);
  }, [value, scrollToValue]);

  // items 변경 시 (예: 월 변경 → 일수 변경) 페인트 전에 스크롤 + 스타일 동기 적용
  const prevItemsLenRef = React.useRef(count);
  React.useLayoutEffect(() => {
    if (prevItemsLenRef.current !== count) {
      prevItemsLenRef.current = count;
      scrollToValue(value);
      applyVisualStyles(true);
    }
  }, [count, value, scrollToValue, applyVisualStyles]);

  // 스냅
  const snapToNearest = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const absIdx = Math.round(el.scrollTop / ITEM_HEIGHT);
    const logical = toLogical(absIdx);
    el.scrollTo({ top: absIdx * ITEM_HEIGHT, behavior: "smooth" });
    visualIndexRef.current = logical;
    applyVisualStyles();
    onChange(items[logical].value);
    setTimeout(() => {
      resetToMiddle();
      isUserScrolling.current = false;
    }, 200);
  }, [items, onChange, toLogical, resetToMiddle, applyVisualStyles]);

  // 네이티브 스크롤
  const handleScroll = React.useCallback(() => {
    if (isResetting.current) return;
    updateVisualIndex();
    if (isDragging.current) return;
    isUserScrolling.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(snapToNearest, 80);
  }, [updateVisualIndex, snapToNearest]);

  // --- 포인터 드래그 ---
  const handlePointerDown = React.useCallback((e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    cancelAnimationFrame(momentumRaf.current);
    isDragging.current = true;
    isUserScrolling.current = true;
    dragStartY.current = e.clientY;
    dragStartScroll.current = el.scrollTop;
    lastMoveY.current = e.clientY;
    lastMoveTime.current = Date.now();
    velocity.current = 0;
    el.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const el = containerRef.current;
      if (!el) return;
      const dy = dragStartY.current - e.clientY;
      el.scrollTop = dragStartScroll.current + dy;
      updateVisualIndex();

      const now = Date.now();
      const dt = now - lastMoveTime.current;
      if (dt > 0) {
        velocity.current = (lastMoveY.current - e.clientY) / dt;
      }
      lastMoveY.current = e.clientY;
      lastMoveTime.current = now;
    },
    [updateVisualIndex]
  );

  const handlePointerUp = React.useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const el = containerRef.current;
      if (!el) return;
      isDragging.current = false;
      el.releasePointerCapture(e.pointerId);

      const v = velocity.current;
      if (Math.abs(v) > 0.3) {
        let currentVelocity = v * 12;
        const friction = 0.94;
        const animate = () => {
          if (Math.abs(currentVelocity) < 0.5) {
            snapToNearest();
            return;
          }
          el.scrollTop += currentVelocity;
          currentVelocity *= friction;
          updateVisualIndex();
          momentumRaf.current = requestAnimationFrame(animate);
        };
        momentumRaf.current = requestAnimationFrame(animate);
      } else {
        snapToNearest();
      }
    },
    [snapToNearest, updateVisualIndex]
  );

  // 아이템 클릭 핸들러 (안정적 참조)
  const handleItemClick = React.useCallback(
    (absIndex: number) => {
      if (Math.abs(velocity.current) > 0.1) return;
      const el = containerRef.current;
      if (!el) return;
      const logical = toLogical(absIndex);
      el.scrollTo({ top: absIndex * ITEM_HEIGHT, behavior: "smooth" });
      visualIndexRef.current = logical;
      applyVisualStyles();
      onChange(items[logical].value);
      setTimeout(resetToMiddle, 250);
    },
    [items, onChange, toLogical, resetToMiddle, applyVisualStyles]
  );

  // 마우스 휠/트랙패드 민감도 증폭 (×2.5)
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollTop += e.deltaY * 2.5;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(momentumRaf.current);
    };
  }, []);

  // 3배 복제 아이템 (memo)
  const allItems = React.useMemo(() => {
    const arr: { value: number; label: string; logicalIndex: number }[] = [];
    for (let c = 0; c < COPIES; c++) {
      for (let i = 0; i < count; i++) {
        arr.push({ ...items[i], logicalIndex: i });
      }
    }
    return arr;
  }, [items, count]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative flex-1 overflow-y-auto scrollbar-none cursor-grab active:cursor-grabbing touch-none"
      style={{ height: ITEM_HEIGHT * VISIBLE_COUNT }}
    >
      <div style={{ height: ITEM_HEIGHT * HALF }} />

      {allItems.map((item, absIndex) => (
        <WheelItem
          key={absIndex}
          label={item.label}
          absIndex={absIndex}
          onClick={handleItemClick}
        />
      ))}

      <div style={{ height: ITEM_HEIGHT * HALF }} />
    </div>
  );
});

/* =========================================================================
   DateWheelPicker — 년 / 월 / 일 3컬럼 휠 피커
   ========================================================================= */

interface DateWheelPickerProps {
  value?: { year: number; month: number; day: number };
  onChange?: (date: { year: number; month: number; day: number }) => void;
  onClose?: () => void;
  onConfirm?: (date: { year: number; month: number; day: number }) => void;
  yearRange?: [number, number];
  className?: string;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

const DateWheelPicker = React.memo(function DateWheelPicker({
  value,
  onChange,
  onClose,
  onConfirm,
  yearRange = [1920, 2030],
  className,
}: DateWheelPickerProps) {
  const now = new Date();
  const [year, setYear] = React.useState(value?.year ?? now.getFullYear());
  const [month, setMonth] = React.useState(value?.month ?? now.getMonth() + 1);
  const [day, setDay] = React.useState(value?.day ?? now.getDate());

  const years = React.useMemo(() => {
    const arr: { value: number; label: string }[] = [];
    for (let y = yearRange[0]; y <= yearRange[1]; y++) {
      arr.push({ value: y, label: String(y) });
    }
    return arr;
  }, [yearRange]);

  const months = React.useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: String(i + 1),
      })),
    []
  );

  const maxDay = getDaysInMonth(year, month);
  const days = React.useMemo(
    () =>
      Array.from({ length: maxDay }, (_, i) => ({
        value: i + 1,
        label: String(i + 1),
      })),
    [maxDay]
  );

  React.useEffect(() => {
    if (day > maxDay) setDay(maxDay);
  }, [maxDay, day]);

  // onChange를 안정화 — 매 렌더마다 새 ref로 최신 함수 유지
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  React.useEffect(() => {
    onChangeRef.current?.({ year, month, day });
  }, [year, month, day]);

  // 자식에게 전달할 콜백 안정화
  const handleYearChange = React.useCallback((v: number) => setYear(v), []);
  const handleMonthChange = React.useCallback((v: number) => setMonth(v), []);
  const handleDayChange = React.useCallback((v: number) => setDay(v), []);

  const handleConfirm = React.useCallback(() => {
    onConfirm?.({ year, month, day });
  }, [onConfirm, year, month, day]);

  return (
    <div
      className={cn(
        "flex w-72 flex-col rounded-2xl bg-white shadow-lg overflow-hidden",
        className
      )}
    >
      <div className="relative flex">
        {/* 중앙 하이라이트 바 */}
        <div
          className="pointer-events-none absolute inset-x-0 z-10 rounded-lg bg-muted/60"
          style={{ top: ITEM_HEIGHT * HALF, height: ITEM_HEIGHT }}
        />
        {/* 상단 그라데이션 */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20"
          style={{
            height: ITEM_HEIGHT * HALF,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        {/* 하단 그라데이션 */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
          style={{
            height: ITEM_HEIGHT * HALF,
            background:
              "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
        />

        <WheelColumn items={years} value={year} onChange={handleYearChange} />
        <WheelColumn
          items={months}
          value={month}
          onChange={handleMonthChange}
        />
        <WheelColumn items={days} value={day} onChange={handleDayChange} />
      </div>

      <div className="flex gap-2 p-3">
        <Button variant="outline" className="flex-1" onClick={onClose}>
          닫기
        </Button>
        <Button variant="cta" className="flex-1" onClick={handleConfirm}>
          선택 완료
        </Button>
      </div>
    </div>
  );
});

export { DateWheelPicker, WheelColumn };
