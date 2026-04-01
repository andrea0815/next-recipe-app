import InputWrapper from './InputWrapper';
import Chip from '@/components/general/Chip';
import { useMemo } from "react";

type SelectItem = {
    id: string;
    name: string;
};

type InputTextProps<
    TDraft,
    K extends keyof TDraft,
    TItem extends SelectItem
> = {
    items: TItem[];
    labelName?: string;
    field: K;
    name?: string;
    draftValue?: string;
    updateDraftValue: (field: K, value: string) => void;
    customClass?: string;
    error?: string;

};

export default function InputText<
    TDraft,
    K extends keyof TDraft,
    TItem extends SelectItem
>({
    items,
    labelName,
    field,
    name,
    draftValue,
    updateDraftValue,
    customClass = "",
    error
}: InputTextProps<TDraft, K, TItem>) {


    return (
        <InputWrapper labelName={labelName} customClass={customClass} error={error}>
            <select
                className={`block w-full h-10 p-2 bg-white text-text rounded-lg border border-gray-500 ${customClass}`}
                value={draftValue ?? ""}
                onChange={(e) => updateDraftValue(field, e.target.value)}
                name={String(name ?? field)}
            >
                <option value="" disabled>
                    Select an option…
                </option>

                {items.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </InputWrapper>
    );
}
