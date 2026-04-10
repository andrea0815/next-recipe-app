import InputWrapper from "./InputWrapper";
import Chip from "@/components/general/Chip";
import { useMemo, useState } from "react";
import InputSelectSearchable from "./InputSelectSearchable";

type SelectItem = {
  id: string;
  name: string;
};

type InputMultiSelectProps<
  TItem extends SelectItem,
  TValueKey extends keyof TItem,
  TLabelKey extends keyof TItem
> = {
  items: TItem[];
  labelName?: string;
  selectedValues: TItem[TValueKey][];
  onChange: (values: TItem[TValueKey][]) => void;
  error?: string;
  name?: string;
  placeholder?: string;
  customClass?: string;
  valueKey: TValueKey;
  labelKey: TLabelKey;
};

export default function InputMultiSelect<
  TItem extends SelectItem,
  TValueKey extends keyof TItem,
  TLabelKey extends keyof TItem
>({
  items,
  labelName,
  selectedValues,
  onChange,
  error,
  name,
  placeholder = "Select an item…",
  customClass = "",
  valueKey,
  labelKey,
}: InputMultiSelectProps<TItem, TValueKey, TLabelKey>) {
  const [draftValue, setDraftValue] = useState("");

  const selected = useMemo(
    () =>
      items.filter((item) =>
        selectedValues.includes(item[valueKey])
      ),
    [items, selectedValues, valueKey]
  );

  const available = useMemo(
    () =>
      items.filter((item) =>
        !selectedValues.includes(item[valueKey])
      ),
    [items, selectedValues, valueKey]
  );

  function add(rawValue: string) {

    if (!rawValue) return;

    const item = items.find((item) => String(item[valueKey]) === rawValue);
    if (!item) return;

    const value = item[valueKey];

    if (selectedValues.includes(value)) return;

    onChange([...selectedValues, value]);
    setDraftValue("");
  }

  function remove(valueToRemove: TItem[TValueKey]) {
    onChange(selectedValues.filter((value) => value !== valueToRemove));
  }

  return (
    <InputWrapper labelName={labelName} error={error} customClass={customClass}>
      <InputSelectSearchable<{ value: string }, "value", TItem, TValueKey, TLabelKey>
        items={available}
        field="value"
        labelName={undefined}
        draftValue={draftValue}
        updateDraftValue={(_, value) => {
          setDraftValue(value);
          add(value);
        }}
        customClass="w-full"
        error=""
        placeholder={placeholder}
        valueKey={valueKey}
        labelKey={labelKey}
      />

      {selected.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selected.map((item, index) => (
            <Chip
              key={`${String(item[valueKey])}-${index}`}
              text={String(item[labelKey])}
              onClick={() => remove(item[valueKey])}
            />
          ))}
        </div>
      )}

      {name &&
        selectedValues.map((value, index) => (
          <input
            key={`${String(value)}-${index}`}
            type="hidden"
            name={name}
            value={String(value)}
          />
        ))}
    </InputWrapper>
  );
}