"use client"

import { useActionState, useState } from 'react';
import { FormState, editIngredient, createIngredient } from '@/actions/ingredients';

import { IngredientDraft } from "@/types/ingredient";
import { FormMode } from "@/types/general";
import { SubmitButtonText } from "@/types/general";
import Navbar from '@/components/nav/Navbar';

export default function IngredientForm({ initialDraft, mode, submitButtonText }: { initialDraft: IngredientDraft, mode: FormMode, submitButtonText: SubmitButtonText }) {

    const initialState: FormState = {
        errors: {}
    }

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
            <Navbar />
            <form action={formAction} className="p-4 space-y-4 max-w-96">

                <div>
                    <label className="text-white">
                        Name
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-black border rounded"
                            name="name"
                            value={draft.name}
                            onChange={(e) => updateDraft("name", e.target.value)}
                        />
                    </label>
                    {state.errors.name && <p className="text-red-500">{state.errors.name}</p>}
                </div>

                <div>
                    <label className="text-white">
                        Plural
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-black border rounded"
                            name="plural"
                            value={draft.plural ?? ""}
                            onChange={(e) => updateDraft("plural", e.target.value)}
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500 cursor-pointer"
                    disabled={isPending}
                >
                    {isPending ? submitText.pending : submitText.default}
                </button>
            </form>
        </>
    );
}
