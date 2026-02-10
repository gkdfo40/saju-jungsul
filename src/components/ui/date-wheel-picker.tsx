import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { WheelColumn, ITEM_HEIGHT, HALF } from "@/components/ui/wheel-column";

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

  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  React.useEffect(() => {
    onChangeRef.current?.({ year, month, day });
  }, [year, month, day]);

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

export { DateWheelPicker };
