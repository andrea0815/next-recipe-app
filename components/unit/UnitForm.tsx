"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { createUnitWithoutRedirect, editUnitWithoutRedirect } from "@/actions/units";
import { FormMode } from "@/types/general";

import type { UnitDraft, UnitFields, UnitPayload } from "@/types/unit";
import type { ActionResult } from "@/types/actions";
import InputFieldText from "../form/InputFieldText";
import Button from "../buttons/Button";


type UnitFormProps = {
    initialDraft: UnitDraft;
    mode: FormMode;
    submitButtonText: {
        default: string;
        pending: string;
    };
    onSuccess?: (unit: UnitDraft) => void;
};

const initialState: ActionResult<UnitFields, UnitPayload> = {
    success: false,
    message: "",
};

export default function UnitForm({
    initialDraft,
    mode,
    submitButtonText,
    onSuccess,
}: UnitFormProps) {

    const action =
        mode === FormMode.CREATE
            ? createUnitWithoutRedirect
            : editUnitWithoutRedirect.bind(null, initialDraft.id);

    const [state, formAction, pending] = useActionState(
        action,
        initialState
    );

    const [draft, setDraft] = useState<UnitDraft>(initialDraft);

    useEffect(() => {
        if (mode === FormMode.CREATE && state.success && "data" in state && state.data) {
            onSuccess?.({
                id: state.data.id,
                name: state.data.name,
                plural: state.data.plural,
                abbreviation: state.data.abbreviation,
            });
        }
    }, [state, mode, onSuccess]);    

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
        <form action={formAction} className="flex flex-col gap-4">

            <InputFieldText<UnitDraft, "name">
                field="name"
                labelName="Name"
                draftValue={draft.name ?? ""}
                updateDraftValue={updateDraft}
                error={!state.success ? state.fieldErrors?.name : undefined}
            />

            <InputFieldText<UnitDraft, "plural">
                field="plural"
                labelName="Plural"
                draftValue={draft.plural ?? ""}
                updateDraftValue={updateDraft}
            />

            <InputFieldText<UnitDraft, "abbreviation">
                field="abbreviation"
                labelName="Abbreviation"
                draftValue={draft.abbreviation ?? ""}
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