import InputWrapper from "./InputWrapper";
import Chip from "@/components/general/Chip";
import { useMemo, useState } from "react";
import InputSelectSearchable from "./InputSelectSearchable";

type SelectItem = {
  id: string;
  name: string;
};

type InputMultiSelectProps<TItem extends SelectItem> = {
  items: TItem[];
  labelName?: string;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  error?: string;
  name?: string; // für hidden inputs
  placeholder?: string;
  customClass?: string;
};

export default function InputMultiSelect<TItem extends SelectItem>({
  items,
  labelName,
  selectedIds,
  onChange,
  error,
  name,
  placeholder = "Select an item…",
  customClass = "",
}: InputMultiSelectProps<TItem>) {
  const [draftValue, setDraftValue] = useState("");

  const selected = useMemo(
    () => items.filter((item) => selectedIds.includes(item.id)),
    [items, selectedIds]
  );

  const available = useMemo(
    () => items.filter((item) => !selectedIds.includes(item.id)),
    [items, selectedIds]
  );

  function add(id: string) {
    if (!id) return;
    if (selectedIds.includes(id)) return;

    onChange([...selectedIds, id]);
    setDraftValue("");
  }

  function remove(id: string) {
    onChange(selectedIds.filter((x) => x !== id));
  }

  return (
    <InputWrapper labelName={labelName} error={error} customClass={customClass}>
      <InputSelectSearchable<{ value: string }, "value", TItem>
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
      />

      {selected.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selected.map((item) => (
            <Chip
              key={item.id}
              text={item.name}
              onClick={() => remove(item.id)}
            />
          ))}
        </div>
      )}

      {name &&
        selectedIds.map((id) => (
          <input key={id} type="hidden" name={name} value={id} />
        ))}
    </InputWrapper>
  );
}