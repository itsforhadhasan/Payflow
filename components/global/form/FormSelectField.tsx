import SelectField from "@/components/global/SelectField";
import { FormField } from "@/components/ui/form";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

export default function FormSelectField<T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder,
  ...props
}: FormSelectFieldProps<T>) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <SelectField
          label={label}
          value={field.value}
          options={options}
          onValueChange={(value: string) => {
            field.onChange(value);
          }}
          placeholder={placeholder}
          {...props}
        />
      )}
    />
  );
}
