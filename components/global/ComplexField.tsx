"use client";

import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ComplexFieldItem {
  label: string;
  value: string;
}

interface ComplexFieldProps {
  items: ComplexFieldItem[];
  setItems: (items: ComplexFieldItem[]) => void;
  label: string;
}

export default function ComplexField({ items, setItems, label }: ComplexFieldProps) {
  const addItem = () => {
    setItems([...items, { label: "", value: "" }]);
  };

  const updateItem = (index: number, field: keyof ComplexFieldItem, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const cleanItems = () => {
    setItems(
      items.filter((item) => item.label.trim() !== "" && item.value !== "")
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <FormLabel>{label}</FormLabel>
        <Button variant="outline" onClick={addItem} type="button">
          New {label}
        </Button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-12 gap-2">
          <Input
            value={item.label}
            onChange={(e) => updateItem(index, "label", e.target.value)}
            placeholder="Label"
            className="col-span-4"
          />
          <Input
            value={item.value}
            onChange={(e) => updateItem(index, "value", e.target.value)}
            placeholder="Value"
            className="col-span-7"
          />
          <Button
            type="button"
            onClick={() => removeItem(index)}
            className="col-span-1"
          >
            <X />
          </Button>
        </div>
      ))}
    </>
  );
}
