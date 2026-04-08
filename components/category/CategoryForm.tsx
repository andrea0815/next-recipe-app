"use client";

import { useActionState, useState } from "react";
import { editCategory, createCategory } from "@/actions/categories";
import { ActionResult } from "@/types/actions";

import type { CategoryDraft, CategoryFields } from "@/types/category";
import { FormMode, SubmitButtonText } from "@/types/general";

export default function CategoryForm({
    initialDraft,
    mode,
    submitButtonText,
}: {
    initialDraft: CategoryDraft;
    mode: FormMode;
    submitButtonText: SubmitButtonText;
}) {
    const initialState: ActionResult<CategoryFields> = {
        success: false,
        message: "",
        fieldErrors: {},
    };

    const action =
        mode === FormMode.CREATE
            ? createCategory
            : editCategory.bind(null, initialDraft.id);

    const [state, formAction, isPending] = useActionState(action, initialState);
    const [draft, setDraft] = useState<CategoryDraft>(initialDraft);

    function updateDraft<K extends keyof CategoryDraft>(
        field: K,
        value: CategoryDraft[K]
    ) {
        setDraft((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
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

            <button
                type="submit"
                className="block w-full p-2 text-text bg-blue-500 rounded disabled:bg-gray-500 cursor-pointer"
                disabled={isPending}
            >
                {isPending ? submitButtonText.pending : submitButtonText.default}
            </button>
        </form>
    );
}