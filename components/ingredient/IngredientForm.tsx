"use client"

import { useActionState, useState } from 'react';
import { editIngredient, createIngredient } from '@/actions/ingredients';
import { ActionResult } from "@/types/actions";
import type { IngredientFields } from "@/types/ingredient"

import { IngredientDraft } from "@/types/ingredient";
import { FormMode } from "@/types/general";
import { SubmitButtonText } from "@/types/general";

export default function IngredientForm({ initialDraft, mode, submitButtonText }: { initialDraft: IngredientDraft, mode: FormMode, submitButtonText: SubmitButtonText }) {

    const initialState: ActionResult<IngredientFields> = {
        success: false,
        message: "",
        fieldErrors: {},
    };

    const action =
        mode === FormMode.CREATE
            ? createIngredient
            : editIngredient.bind(null, initialDraft.id);

    const [state, formAction, isPending] = useActionState(action, initialState);
    const [draft, setDraft] = useState<IngredientDraft>(initialDraft);

    const submitText = submitButtonText;

    function updateDraft<K extends keyof IngredientDraft>(
        field: K,
        value: IngredientDraft[K]
    ) {
        setDraft((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
        <>
            <form action={formAction} className="p-4 space-y-4 max-w-96">

                <div>
                    <label className="text-text">
                        Name
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-text border rounded"
                            name="name"
                            value={draft.name}
                            onChange={(e) => updateDraft("name", e.target.value)}
                        />
                    </label>
                    {!state.success && state.fieldErrors?.name && (
                        <p className="text-red-500">{state.fieldErrors.name}</p>
                    )}
                </div>

                <div>
                    <label className="text-text">
                        Plural
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-text border rounded"
                            name="plural"
                            value={draft.plural ?? ""}
                            onChange={(e) => updateDraft("plural", e.target.value)}
                        />
                    </label>
                    {!state.success && state.fieldErrors?.plural && (
                        <p className="text-red-500">{state.fieldErrors.plural}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="block w-full p-2 text-text bg-blue-500 rounded disabled:bg-gray-500 cursor-pointer"
                    disabled={isPending}
                >
                    {isPending ? submitText.pending : submitText.default}
                </button>
            </form>
        </>
    );
}
