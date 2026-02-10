import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WheelColumn, ITEM_HEIGHT, HALF } from "@/components/ui/wheel-column";

/** 12시간제 → 24시간제 변환 */
function to24Hour(period: number, hour12: number): number {
  if (period === 0) return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

/** 24시간제 → 12시간제 변환 */
function to12Hour(hour24: number): { period: number; hour: number } {
  if (hour24 === 0) return { period: 0, hour: 12 };
  if (hour24 < 12) return { period: 0, hour: hour24 };
  if (hour24 === 12) return { period: 1, hour: 12 };
  return { period: 1, hour: hour24 - 12 };
}

interface TimeValue {
  /** 24시간제 (0~23) */
  hour: number;
  /** 분 (0~59) */
  minute: number;
}

interface TimeWheelPickerProps {
  value?: TimeValue;
  onChange?: (time: TimeValue) => void;
  onClose?: () => void;
  onConfirm?: (time: TimeValue) => void;
  /** 분 간격 (기본: 1) */
  minuteStep?: number;
  className?: string;
}

const PERIOD_ITEMS: { value: number; label: string }[] = [
  { value: 0, label: "오전" },
  { value: 1, label: "오후" },
];

const TimeWheelPicker = React.memo(function TimeWheelPicker({
  value,
  onChange,
  onClose,
  onConfirm,
  minuteStep = 1,
  className,
}: TimeWheelPickerProps) {
  // 외부 24시간 값을 내부 12시간제로 변환
  const init = to12Hour(value?.hour ?? 0);
  const [period, setPeriod] = React.useState(init.period);
  const [hour12, setHour12] = React.useState(init.hour);
  const [minute, setMinute] = React.useState(value?.minute ?? 0);

  const hours = React.useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: String(i + 1),
      })),
    []
  );

  const minutes = React.useMemo(() => {
    const arr: { value: number; label: string }[] = [];
    for (let m = 0; m < 60; m += minuteStep) {
      arr.push({ value: m, label: String(m).padStart(2, "0") });
    }
    return arr;
  }, [minuteStep]);

  // onChange 안정화
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  React.useEffect(() => {
    onChangeRef.current?.({
      hour: to24Hour(period, hour12),
      minute,
    });
  }, [period, hour12, minute]);

  const handlePeriodChange = React.useCallback((v: number) => setPeriod(v), []);
  const handleHourChange = React.useCallback((v: number) => setHour12(v), []);
  const handleMinuteChange = React.useCallback((v: number) => setMinute(v), []);

  const handleConfirm = React.useCallback(() => {
    onConfirm?.({
      hour: to24Hour(period, hour12),
      minute,
    });
  }, [onConfirm, period, hour12, minute]);

  return (
    <div
      className={cn(
        "flex w-72 flex-col rounded-2xl bg-white shadow-lg overflow-hidden",
        className
      )}
    >
      <div className="relative flex">
        <div
          className="pointer-events-none absolute inset-x-0 z-10 rounded-lg bg-muted/60"
          style={{ top: ITEM_HEIGHT * HALF, height: ITEM_HEIGHT }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20"
          style={{
            height: ITEM_HEIGHT * HALF,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
          style={{
            height: ITEM_HEIGHT * HALF,
            background:
              "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
        />

        <WheelColumn
          items={PERIOD_ITEMS}
          value={period}
          onChange={handlePeriodChange}
          circular={false}
        />
        <WheelColumn items={hours} value={hour12} onChange={handleHourChange} />
        <WheelColumn
          items={minutes}
          value={minute}
          onChange={handleMinuteChange}
        />
      </div>

      <div className="flex gap-2 border-t border-border p-3">
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

export { TimeWheelPicker };
export type { TimeValue };
