import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WheelColumn, ITEM_HEIGHT, HALF } from "@/components/ui/wheel-column";

interface TimeWheelPickerProps {
  value?: { period: number; hour: number; minute: number };
  onChange?: (time: { period: number; hour: number; minute: number }) => void;
  onClose?: () => void;
  onConfirm?: (time: { period: number; hour: number; minute: number }) => void;
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
  const [period, setPeriod] = React.useState(value?.period ?? 0);
  const [hour, setHour] = React.useState(value?.hour ?? 12);
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

  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  React.useEffect(() => {
    onChangeRef.current?.({ period, hour, minute });
  }, [period, hour, minute]);

  const handlePeriodChange = React.useCallback((v: number) => setPeriod(v), []);
  const handleHourChange = React.useCallback((v: number) => setHour(v), []);
  const handleMinuteChange = React.useCallback((v: number) => setMinute(v), []);

  const handleConfirm = React.useCallback(() => {
    onConfirm?.({ period, hour, minute });
  }, [onConfirm, period, hour, minute]);

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
        <WheelColumn items={hours} value={hour} onChange={handleHourChange} />
        <WheelColumn
          items={minutes}
          value={minute}
          onChange={handleMinuteChange}
        />
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

export { TimeWheelPicker };
