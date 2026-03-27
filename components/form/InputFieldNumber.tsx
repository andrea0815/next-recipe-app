import { FormState } from '@/actions/recipes';
import React from 'react';
import type { RecipeDraft } from "@/types/recipe"
import InputWrapper from './InputWrapper';
type InputFieldNumberProps<TDraft, K extends keyof TDraft> = {
    field: K;
    name?: string;
    labelName: string;
    draftValue: number;
    updateDraftValue: (field: K, value: number) => void;
    min?: number;
    step?: number;
    error?: string;
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
}: InputFieldNumberProps<TDraft, K>) {
    return (
        <InputWrapper labelName={labelName} error={error}>
            <input
                type="number"
                name={String(name ?? field)}
                value={draftValue}
                onChange={(e) => updateDraftValue(field, Number(e.target.value))}
                className="block w-full p-2 bg-white text-text rounded-lg border border-gray-500"
                min={min}
                step={step}
            />
        </InputWrapper>
    );
}