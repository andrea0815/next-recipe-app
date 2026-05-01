"use client";

import { useEffect, useState } from "react";
import InputWrapper from "./InputWrapper";


type InputFieldNumberProps<TDraft, K extends keyof TDraft> = {
  field: K;
  name?: string;
  labelName: string;
  draftValue: number | null;
  updateDraftValue: (field: K, value: number) => void;
  min?: number;
  step?: number;
  error?: string;
  customClass?: string;
  disabled?: boolean;

};

export default function InputFieldNumber<TDraft, K extends keyof TDraft>({
  name,
  field,
  labelName,
  draftValue,
  updateDraftValue,
  min = 0,
  step = 0.1,
  error,
  customClass = "",
  disabled = false,

}: InputFieldNumberProps<TDraft, K>) {
  const [inputValue, setInputValue] = useState(
    draftValue === null ? "" : String(draftValue)
  );

  useEffect(() => {
    setInputValue(draftValue === null ? "" : String(draftValue));
  }, [draftValue]);

  function commitValue(rawValue: string) {
    if (rawValue.trim() === "") {
      setInputValue("0");
      updateDraftValue(field, 0);
      return;
    }

    const nextValue = Number(rawValue);

    if (Number.isNaN(nextValue)) {
      setInputValue(String(draftValue ?? 0));
      return;
    }

    const clampedValue = Math.max(min, nextValue);

    setInputValue(String(clampedValue));
    updateDraftValue(field, clampedValue);
  }

  return (
    <InputWrapper
      labelName={labelName}
      customClass={customClass}
      {...(error !== undefined ? { error } : {})}
    >
      <input
        type="number"
        name={String(name ?? field)}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={(e) => commitValue(e.target.value)}
        className={`block w-full h-(--btn-h-sm) p-2 bg-white text-text rounded-lg border border-gray-500 disabled:opacity-50 ${customClass ? customClass : ""
          }`}
        min={min}
        step={step}
        disabled={disabled}

      />
    </InputWrapper>
  );
}