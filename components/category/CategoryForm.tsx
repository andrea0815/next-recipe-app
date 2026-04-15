"use client";

import { useRef, useEffect, useState } from "react";
import { useActionState } from "react";
import { createCategoryWithoutRedirect, editCategoryWithoutRedirect } from "@/actions/categories";
import { FormMode } from "@/types/general";
import { showSuccessToast, showErrorToast } from "../general/ToastProvider";

import type { CategoryDraft, CategoryFields, CategoryPayload } from "@/types/category";
import type { ActionResult } from "@/types/actions";
import InputFieldText from "../form/InputFieldText";
import Button from "../buttons/Button";


type CategoryFormProps = {
    initialDraft: CategoryDraft;
    mode: FormMode;
    submitButtonText: {
        default: string;
        pending: string;
    };
    onSuccess?: (category: CategoryDraft) => void;
};

const initialState: ActionResult<CategoryFields, CategoryPayload> = {
    success: false,
    message: "",
};

export default function CategoryForm({
    initialDraft,
    mode,
    submitButtonText,
    onSuccess,
}: CategoryFormProps) {

    const action =
        mode === FormMode.CREATE
            ? createCategoryWithoutRedirect
            : editCategoryWithoutRedirect.bind(null, initialDraft.id);

    const [state, formAction, pending] = useActionState(
        action,
        initialState
    );

    const [draft, setDraft] = useState<CategoryDraft>(initialDraft);

    useEffect(() => {
        if (!state.message) return;

        console.log("toast effect", state);

        if (state.success) {
            showSuccessToast(state.message);

            if (mode === FormMode.CREATE && state.data) {
                onSuccess?.({
                    id: state.data.id,
                    name: state.data.name,
                });
            }
        } else {
            showErrorToast(state.message);
        }
    }, [state, mode, onSuccess]);

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
        <form action={formAction} className="flex flex-col gap-4">

            <InputFieldText<CategoryDraft, "name">
                field="name"
                labelName="Name*"
                draftValue={draft.name ?? ""}
                updateDraftValue={updateDraft}
                error={!state.success ? state.fieldErrors?.name : undefined}
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