"use client";

import { useActionState, useState } from "react";
import { editUnit, createUnit } from "@/actions/units";
import { ActionResult } from "@/types/actions";

import type { UnitDraft, UnitFieldErrors } from "@/types/unit";
import { FormMode, SubmitButtonText } from "@/types/general";

export default function UnitForm({
    initialDraft,
    mode,
    submitButtonText,
}: {
    initialDraft: UnitDraft;
    mode: FormMode;
    submitButtonText: SubmitButtonText;
}) {
    const initialState: ActionResult<UnitFieldErrors> = {
        success: false,
        message: "",
        fieldErrors: {},
    };

    const action =
        mode === FormMode.CREATE
            ? createUnit
            : editUnit.bind(null, initialDraft.id);

    const [state, formAction, isPending] = useActionState(action, initialState);
    const [draft, setDraft] = useState<UnitDraft>(initialDraft);

    function updateDraft<K extends keyof UnitDraft>(
        field: K,
        value: UnitDraft[K]
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

            <div>
                <label className="text-text">
                    Shorthand
                    <input
                        type="text"
                        className="block w-full p-2 bg-white text-text border rounded"
                        name="abbreviation"
                        value={draft.abbreviation ?? ""}
                        onChange={(e) => updateDraft("abbreviation", e.target.value)}
                    />
                </label>
                {!state.success && state.fieldErrors?.abbreviation && (
                    <p className="text-red-500">{state.fieldErrors.abbreviation}</p>
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