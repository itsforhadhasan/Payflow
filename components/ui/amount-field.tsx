import * as React from "react";
import { cn } from "@/lib/utils";

export interface AmountFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value?: string | number;
  onChange?: (value: string) => void;
}

const AmountField = React.forwardRef<HTMLInputElement, AmountFieldProps>(
  ({ className, value, onChange, onWheel, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState<string>(
      value?.toString() || ""
    );

    React.useEffect(() => {
      setInputValue(value?.toString() || "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Allow empty string
      if (newValue === "") {
        setInputValue("");
        onChange?.("");
        return;
      }

      // Regex to match valid decimal numbers:
      // - Optional leading digits
      // - Optional decimal point followed by digits
      // - No multiple decimal points
      // - No leading zeros unless it's 0.something
      const regex = /^(0|[1-9]\d*)(\.\d*)?$/;

      if (regex.test(newValue)) {
        setInputValue(newValue);
        onChange?.(newValue);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow: backspace, delete, tab, escape, enter, decimal point
      if (
        [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl/cmd+A
        (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+V
        (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
        return;
      }

      // Ensure that it is a number or decimal point and stop the keypress
      if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
      ) {
        e.preventDefault();
      }
    };

    const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
      // Prevent scroll wheel from changing the value
      e.currentTarget.blur();
      onWheel?.(e);
    };

    return (
      <input
        type="text"
        inputMode="decimal"
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        {...props}
      />
    );
  }
);

AmountField.displayName = "AmountField";

export { AmountField };

