import InputWrapper from './InputWrapper';
import Chip from '@/components/general/Chip';
import { useMemo } from "react";

type SelectItem = {
    id: string;
    name: string;
};

type InputTextProps<TItem extends SelectItem> = {
    items: TItem[];
    labelName?: string;
    selectedIds: string[];
    onChange: (ids: string[]) => void;
    error?: string;
    children?: any
};

export default function InputText<TItem extends SelectItem>({
    items,
    labelName,
    selectedIds,
    onChange,
    error,
}: InputTextProps<TItem>) {

    const selected = useMemo(
        () => items.filter((c) => selectedIds.includes(c.id)),
        [items, selectedIds]
    );

    const available = useMemo(
        () => items.filter((c) => !selectedIds.includes(c.id)),
        [items, selectedIds]
    );

    function add(id: string) {
        if (!id) return;
        onChange(selectedIds.includes(id) ? selectedIds : [...selectedIds, id]);
    }

    function remove(id: string) {
        onChange(selectedIds.filter((x) => x !== id));
    }

    return (
        <InputWrapper labelName={labelName} error={error}>
            {/* Dropdown */}
            <select
                className="block w-full h-10 p-2 bg-white text-text rounded-lg border border-gray-500"
                value=""
                onChange={(e) => {
                    add(e.target.value);
                    // keep placeholder selected
                    e.currentTarget.value = "";
                }}
            >
                <option value="" disabled>
                    Select a category…
                </option>

                {available.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            {/* Chips */}
            {selected.length > 0 &&
                <div className="mt-3 flex flex-wrap gap-2">
                    {selected.map((c) => (
                        <Chip
                            key={c.id}
                            onClick={() => remove(c.id)}
                            text={c.name}
                        />
                    ))}
                </div>}

            {/* Hidden inputs so FormData contains category_ids[] */}
            {selectedIds.map((id) => (
                <input key={id} type="hidden" name="category_ids" value={id} />
            ))}

        </InputWrapper >
    );
}
