import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPFieldProps {
  value: string;
  setValue: (value: string) => void;
}

export default function OTPField({ value, setValue }: OTPFieldProps) {
  return (
    <InputOTP
      maxLength={6}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      className="w-full"
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  );
}
