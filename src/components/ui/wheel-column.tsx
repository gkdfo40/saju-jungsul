import * as React from "react";

/* =========================================================================
   WheelColumn — iOS 스타일 스크롤 휠 (성능 최적화)
   - circular=true: 순환 스크롤 (3배 복제 + 리셋)
   - circular=false: 비순환 (단순 스크롤, 경계 제한)
   ========================================================================= */

export const ITEM_HEIGHT = 40;
export const VISIBLE_COUNT = 5;
export const HALF = Math.floor(VISIBLE_COUNT / 2);
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

export interface WheelColumnProps {
  items: { value: number; label: string }[];
  value: number;
  onChange: (value: number) => void;
  /** 순환 스크롤 여부 (기본: true) */
  circular?: boolean;
}

const WheelColumn = React.memo(function WheelColumn({
  items,
  value,
  onChange,
  circular = true,
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
  const midOffset = circular ? count : 0;

  const visualIndexRef = React.useRef(
    Math.max(0, items.findIndex((item) => item.value === value))
  );
  const prevVisualRef = React.useRef(-1);

  const toLogical = React.useCallback(
    (absIdx: number) =>
      circular
        ? ((absIdx % count) + count) % count
        : Math.max(0, Math.min(count - 1, absIdx)),
    [count, circular]
  );

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
        const circDist = circular
          ? Math.min(distance, count - distance)
          : distance;
        const isCenter = circDist === 0;

        child.style.opacity = isCenter ? "1" : circDist === 1 ? "0.4" : "0.2";
        child.style.transform = `scale(${isCenter ? 1 : circDist === 1 ? 0.9 : 0.85})`;
        child.style.fontSize = isCenter ? "18px" : "15px";
        child.style.fontWeight = isCenter ? "900" : "400";
      });
    },
    [count, circular, toLogical]
  );

  const updateVisualIndex = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const absIdx = Math.round(el.scrollTop / ITEM_HEIGHT);
    visualIndexRef.current = toLogical(absIdx);
    applyVisualStyles();
  }, [toLogical, applyVisualStyles]);

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

  const resetToMiddle = React.useCallback(() => {
    if (!circular) return;
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
  }, [circular, count, midOffset, toLogical]);

  // 초기 마운트
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

  // items 변경 시 페인트 전에 동기 적용
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
    const clamped = circular
      ? absIdx
      : Math.max(0, Math.min(count - 1, absIdx));
    const logical = toLogical(clamped);
    el.scrollTo({ top: clamped * ITEM_HEIGHT, behavior: "smooth" });
    visualIndexRef.current = logical;
    applyVisualStyles();
    onChange(items[logical].value);
    setTimeout(() => {
      resetToMiddle();
      isUserScrolling.current = false;
    }, 200);
  }, [circular, count, items, onChange, toLogical, resetToMiddle, applyVisualStyles]);

  // 네이티브 스크롤
  const handleScroll = React.useCallback(() => {
    if (isResetting.current) return;
    updateVisualIndex();
    if (isDragging.current) return;
    isUserScrolling.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(snapToNearest, 80);
  }, [updateVisualIndex, snapToNearest]);

  // 포인터 드래그
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
      if (circular) setTimeout(resetToMiddle, 250);
    },
    [circular, items, onChange, toLogical, resetToMiddle, applyVisualStyles]
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

  // 순환: 3배 복제 / 비순환: 원본 그대로
  const allItems = React.useMemo(() => {
    const copies = circular ? COPIES : 1;
    const arr: { value: number; label: string; logicalIndex: number }[] = [];
    for (let c = 0; c < copies; c++) {
      for (let i = 0; i < count; i++) {
        arr.push({ ...items[i], logicalIndex: i });
      }
    }
    return arr;
  }, [circular, items, count]);

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

export { WheelColumn };
