"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { createIngredientWithoutRedirect, editIngredientWithoutRedirect } from "@/actions/ingredients";
import { FormMode } from "@/types/general";

import type { IngredientDraft, IngredientFields, IngredientPayload } from "@/types/ingredient";
import type { ActionResult } from "@/types/actions";
import InputFieldText from "../form/InputFieldText";
import Button from "../buttons/Button";


type IngredientFormProps = {
    initialDraft: IngredientDraft;
    mode: FormMode;
    submitButtonText: {
        default: string;
        pending: string;
    };
    onSuccess?: (ingredient: IngredientDraft) => void;
};

const initialState: ActionResult<IngredientFields, IngredientPayload> = {
    success: false,
    message: "",
};

export default function IngredientForm({
    initialDraft,
    mode,
    submitButtonText,
    onSuccess,
}: IngredientFormProps) {

    const action =
        mode === FormMode.CREATE
            ? createIngredientWithoutRedirect
            : editIngredientWithoutRedirect.bind(null, initialDraft.id);

    const [state, formAction, pending] = useActionState(
        action,
        initialState
    );

    const [draft, setDraft] = useState<IngredientDraft>(initialDraft);

    useEffect(() => {
        if (mode === FormMode.CREATE && state.success && "data" in state && state.data) {
            onSuccess?.({
                id: state.data.id,
                name: state.data.name,
                plural: state.data.plural,
            });
        }
    }, [state, mode, onSuccess]);    

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
        <form action={formAction} className="flex flex-col gap-4">

            <InputFieldText<IngredientDraft, "name">
                field="name"
                labelName="Name"
                draftValue={draft.name ?? ""}
                updateDraftValue={updateDraft}
                error={!state.success ? state.fieldErrors?.name : undefined}
            />

            <InputFieldText<IngredientDraft, "plural">
                field="plural"
                labelName="Plural"
                draftValue={draft.plural ?? ""}
                updateDraftValue={updateDraft}
            />

            <Button
                type="submit"
                disabled={pending}
                customClass="mt-4"
            >
                {pending ? submitButtonText.pending : submitButtonText.default}
            </Button>
        </form>
    );
}