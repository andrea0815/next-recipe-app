"use client";

import { useActionState, useState } from "react";
import { editUnit, createUnit } from "@/actions/units";
import { ActionResult } from "@/types/actions";

import type { UnitDraft, UnitFieldErrors } from "@/types/unit";
import { FormMode, SubmitButtonText } from "@/types/general";
import SectionWrapper from "../containers/SectionWrapper";
import InputFieldText from "../form/InputFieldText";
import FormSection from "../form/FormSection";

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
        <FormSection
            submitButtonText={submitButtonText}
            formAction={formAction}
            isPending={isPending}
            >

            <InputFieldText<UnitDraft, "name">
                field="name"
                labelName="Name*"
                draftValue={draft.name}
                updateDraftValue={updateDraft}
                error={!state.success ? state.fieldErrors?.name : undefined}
            />

            <InputFieldText<UnitDraft, "plural">
                field="plural"
                labelName="Plural"
                draftValue={draft.plural}
                updateDraftValue={updateDraft}
                error={!state.success ? state.fieldErrors?.plural : undefined}
            />

            <InputFieldText<UnitDraft, "abbreviation">
                field="abbreviation"
                labelName="Shorthand"
                draftValue={draft.abbreviation}
                updateDraftValue={updateDraft}
                error={!state.success ? state.fieldErrors?.abbreviation : undefined}
            />

        </FormSection>

    );
}