import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* =========================================================================
   WheelColumn — iOS 스타일 순환 스크롤 휠 단일 컬럼
   ========================================================================= */

const ITEM_HEIGHT = 40;
const VISIBLE_COUNT = 5;
const HALF = Math.floor(VISIBLE_COUNT / 2);
const COPIES = 3; // 아이템 리스트를 3번 복제 (순환용)

interface WheelColumnProps {
  items: { value: number; label: string }[];
  value: number;
  onChange: (value: number) => void;
}

function WheelColumn({ items, value, onChange }: WheelColumnProps) {
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
  // 중간 세트의 시작 오프셋 (아이템 기준)
  const midOffset = count; // 두 번째 세트의 시작 index

  // 실시간 시각 인덱스 (원본 items 기준 0~count-1)
  const [visualIndex, setVisualIndex] = React.useState(() =>
    items.findIndex((item) => item.value === value)
  );

  // 전체 아이템에서의 절대 인덱스 → 원본 인덱스
  const toLogical = React.useCallback(
    (absIdx: number) => ((absIdx % count) + count) % count,
    [count]
  );

  // 스크롤 위치에서 절대 인덱스 → 원본 인덱스 계산, visualIndex 업데이트
  const updateVisualIndex = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const absIdx = Math.round(el.scrollTop / ITEM_HEIGHT);
    setVisualIndex(toLogical(absIdx));
  }, [toLogical]);

  // 값을 기반으로 중간 세트의 해당 위치로 스크롤 (점프)
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
      setVisualIndex(idx);
    },
    [items, midOffset]
  );

  // 경계에 가까워지면 중간 세트로 무소음 리셋
  const resetToMiddle = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const absIdx = Math.round(el.scrollTop / ITEM_HEIGHT);
    const logical = toLogical(absIdx);
    // 첫 번째 세트나 세 번째 세트에 있으면 중간으로 이동
    if (absIdx < count * 0.5 || absIdx >= count * 2.5) {
      isResetting.current = true;
      el.scrollTop = (midOffset + logical) * ITEM_HEIGHT;
      // 다음 프레임에서 플래그 해제
      requestAnimationFrame(() => {
        isResetting.current = false;
      });
    }
  }, [count, midOffset, toLogical]);

  // 초기 마운트 시 중간 세트로 스크롤
  React.useEffect(() => {
    scrollToValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 외부에서 value가 변경되면 위치 이동
  React.useEffect(() => {
    if (isUserScrolling.current) return;
    scrollToValue(value);
  }, [value, scrollToValue]);

  // 스냅: 가장 가까운 아이템으로 정렬 + 값 업데이트 + 중간 리셋
  const snapToNearest = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const absIdx = Math.round(el.scrollTop / ITEM_HEIGHT);
    const logical = toLogical(absIdx);
    el.scrollTo({ top: absIdx * ITEM_HEIGHT, behavior: "smooth" });
    setVisualIndex(logical);
    onChange(items[logical].value);
    setTimeout(() => {
      resetToMiddle();
      isUserScrolling.current = false;
    }, 200);
  }, [items, onChange, toLogical, resetToMiddle]);

  // 네이티브 스크롤 (마우스 휠 / 트랙패드)
  const handleScroll = () => {
    if (isResetting.current) return;
    updateVisualIndex();
    if (isDragging.current) return;
    isUserScrolling.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(snapToNearest, 80);
  };

  // --- 포인터 드래그 ---
  const handlePointerDown = (e: React.PointerEvent) => {
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
  };

  const handlePointerMove = (e: React.PointerEvent) => {
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
  };

  const handlePointerUp = (e: React.PointerEvent) => {
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
  };

  // cleanup
  React.useEffect(() => {
    return () => cancelAnimationFrame(momentumRaf.current);
  }, []);

  // 3배 복제 아이템 렌더링
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
      style={{
        height: ITEM_HEIGHT * VISIBLE_COUNT,
      }}
    >
      {/* 상단 padding */}
      <div style={{ height: ITEM_HEIGHT * HALF }} />

      {allItems.map((item, absIndex) => {
        const distance = Math.abs(item.logicalIndex - visualIndex);
        // 순환 거리 (예: 0과 11의 거리 = 1)
        const circDist = Math.min(distance, count - distance);
        const isCenter = circDist === 0;
        const opacity = isCenter ? 1 : circDist === 1 ? 0.4 : 0.2;
        const scale = isCenter ? 1 : circDist === 1 ? 0.9 : 0.85;

        return (
          <div
            key={absIndex}
            className="flex items-center justify-center font-primary select-none"
            style={{
              height: ITEM_HEIGHT,
              opacity,
              transform: `scale(${scale})`,
              fontSize: isCenter ? "18px" : "15px",
              fontWeight: isCenter ? 900 : 400,
              transition:
                "opacity 0.1s, transform 0.1s, font-size 0.1s, font-weight 0.1s",
            }}
            onClick={() => {
              if (Math.abs(velocity.current) > 0.1) return;
              const el = containerRef.current;
              if (!el) return;
              el.scrollTo({ top: absIndex * ITEM_HEIGHT, behavior: "smooth" });
              setVisualIndex(item.logicalIndex);
              onChange(item.value);
              setTimeout(resetToMiddle, 250);
            }}
          >
            {item.label}
          </div>
        );
      })}

      {/* 하단 padding */}
      <div style={{ height: ITEM_HEIGHT * HALF }} />
    </div>
  );
}

/* =========================================================================
   DateWheelPicker — 년 / 월 / 일 3컬럼 휠 피커
   ========================================================================= */

interface DateWheelPickerProps {
  /** 현재 선택된 날짜 */
  value?: { year: number; month: number; day: number };
  /** 날짜 변경 콜백 */
  onChange?: (date: { year: number; month: number; day: number }) => void;
  /** 닫기 콜백 */
  onClose?: () => void;
  /** 선택 완료 콜백 */
  onConfirm?: (date: { year: number; month: number; day: number }) => void;
  /** 년도 범위 (기본: 1920~2030) */
  yearRange?: [number, number];
  className?: string;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function DateWheelPicker({
  value,
  onChange,
  onClose,
  onConfirm,
  yearRange = [1920, 2030],
  className,
}: DateWheelPickerProps) {
  const now = new Date();
  const [year, setYear] = React.useState(value?.year ?? now.getFullYear());
  const [month, setMonth] = React.useState(
    value?.month ?? now.getMonth() + 1
  );
  const [day, setDay] = React.useState(value?.day ?? now.getDate());

  // 년도 목록
  const years = React.useMemo(() => {
    const arr: { value: number; label: string }[] = [];
    for (let y = yearRange[0]; y <= yearRange[1]; y++) {
      arr.push({ value: y, label: String(y) });
    }
    return arr;
  }, [yearRange]);

  // 월 목록
  const months = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      label: String(i + 1),
    }));
  }, []);

  // 일 목록 (년/월에 따라 동적)
  const maxDay = getDaysInMonth(year, month);
  const days = React.useMemo(() => {
    return Array.from({ length: maxDay }, (_, i) => ({
      value: i + 1,
      label: String(i + 1),
    }));
  }, [maxDay]);

  // 월 변경 시 day가 범위 초과하면 보정
  React.useEffect(() => {
    if (day > maxDay) setDay(maxDay);
  }, [maxDay, day]);

  // 외부로 변경 알림
  React.useEffect(() => {
    onChange?.({ year, month, day });
  }, [year, month, day, onChange]);

  return (
    <div
      className={cn(
        "flex w-72 flex-col rounded-2xl bg-white shadow-lg overflow-hidden",
        className
      )}
    >
      {/* 휠 영역 */}
      <div className="relative flex">
        {/* 중앙 하이라이트 바 */}
        <div
          className="pointer-events-none absolute inset-x-0 z-10 rounded-lg bg-muted/60"
          style={{
            top: ITEM_HEIGHT * HALF,
            height: ITEM_HEIGHT,
          }}
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

        <WheelColumn items={years} value={year} onChange={setYear} />
        <WheelColumn items={months} value={month} onChange={setMonth} />
        <WheelColumn items={days} value={day} onChange={setDay} />
      </div>

      {/* 하단 버튼 */}
      <div className="flex gap-2 border-t border-border p-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onClose?.()}
        >
          닫기
        </Button>
        <Button
          variant="cta"
          className="flex-1"
          onClick={() => onConfirm?.({ year, month, day })}
        >
          선택 완료
        </Button>
      </div>
    </div>
  );
}

export { DateWheelPicker, WheelColumn };
