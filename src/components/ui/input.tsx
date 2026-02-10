import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full min-w-0 rounded-md text-base outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "border-input h-9 border bg-transparent px-3 py-1 shadow-xs dark:bg-input/30",
          "placeholder:text-muted-foreground",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "selection:bg-primary selection:text-primary-foreground md:text-sm",
        ],
        glass: [
          "bg-transparent font-primary leading-5 text-white",
          "placeholder:text-white/60",
          "focus-visible:ring-0 focus-visible:border-0",
          "selection:bg-white/30 selection:text-white",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const wrapperVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      default: "",
      glass:
        "w-72 px-4 py-3.5 bg-white/20 rounded-xl backdrop-blur-[2px] justify-between gap-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type InputProps = React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    onClear?: () => void;
  };

function Input({
  className,
  variant = "default",
  type,
  value,
  defaultValue,
  onChange,
  onClear,
  ...props
}: InputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = React.useState(
    (defaultValue as string) ?? ""
  );
  const isControlled = value !== undefined;
  const currentValue = isControlled ? (value as string) : internalValue;
  const hasValue = currentValue.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    onClear?.();
    inputRef.current?.focus();
  };

  // default variant — 기존 shadcn 그대로
  if (variant === "default") {
    return (
      <input
        ref={inputRef}
        type={type}
        data-slot="input"
        className={cn(inputVariants({ variant }), className)}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={onChange}
        {...props}
      />
    );
  }

  // glass variant — 커스텀 글래스모피즘 인풋
  return (
    <div className={cn(wrapperVariants({ variant }), className)}>
      <input
        ref={inputRef}
        type={type}
        data-slot="input"
        className={cn(inputVariants({ variant }), "flex-1")}
        value={isControlled ? currentValue : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={handleChange}
        {...props}
      />
      {hasValue && (
        <button
          type="button"
          onClick={handleClear}
          className="size-5 shrink-0 cursor-pointer"
          aria-label="입력 지우기"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill="white" fillOpacity="0.6" />
            <path
              d="M7 7L13 13"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M13 7L7 13"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Input, inputVariants };
