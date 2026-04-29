"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import IconMinusCircle from "../icons/IconMinusCircle";
import IconPlusCircle from "../icons/IconPlusCircle";
import Button from "@/components/buttons/Button";

export default function NumberSelect({
  value,
  name,
  unit,
  stretch = false,
  step = 1,
  min = 1,
  onValueChange,
}: {
  value: number | null;
  name?: string;
  unit?: string;
  step?: number;
  stretch?: boolean;
  min?: number;
  onValueChange: Dispatch<SetStateAction<number>>;
}) {
  const [draftValue, setDraftValue] = useState(
    value === null ? "" : String(value)
  );

  useEffect(() => {
    setDraftValue(value === null ? "" : String(value));
  }, [value]);

  function commitValue(rawValue: string) {
    if (rawValue.trim() === "") {
      setDraftValue("0");
      onValueChange(0);
      return;
    }

    const nextValue = Number(rawValue);

    if (Number.isNaN(nextValue)) {
      setDraftValue(String(value ?? 0));
      return;
    }

    setDraftValue(String(nextValue));
    onValueChange(nextValue);
  }

  const addPortion = () => {
    const currentValue = Number(draftValue || value || 0);
    const nextValue = Math.min(999, currentValue + step);

    setDraftValue(String(nextValue));
    onValueChange(nextValue);
  };

  const subtractPortion = () => {
    const currentValue = Number(draftValue || value || 0);
    const nextValue = Math.max(min, currentValue - step);

    setDraftValue(String(nextValue));
    onValueChange(nextValue);
  };

  return (
    <div className="flex gap-2 items-center h-(--btn-h-sm)">
      <Button
        type="button"
        onClick={subtractPortion}
        size="small"
        priority="tertiary"
        color="primary"
        disabled={Number(draftValue || value || 0) <= min}
      >
        <IconMinusCircle size={28} />
      </Button>

      <input
        type="number"
        value={draftValue}
        onChange={(e) => setDraftValue(e.target.value)}
        onBlur={(e) => commitValue(e.target.value)}
        className={`${stretch ? "w-full" : "w-12"} text-center h-(--btn-h-sm) p-2 bg-white text-text rounded-lg border border-gray-500 no-spinner`}
        min={min}
        step={step}
        name={name}
      />

      <Button
        type="button"
        onClick={addPortion}
        priority="tertiary"
        color="primary"
        size="small"
      >
        <IconPlusCircle size={28} />
      </Button>

      {unit && <p>{unit}</p>}
    </div>
  );
}