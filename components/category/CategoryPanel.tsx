"use client";

import React, { useActionState, forwardRef, useImperativeHandle, useState } from "react";
import CategoryForm from "@/components/category/CategoryForm";
import { FormMode, ItemType } from "@/types/general";
import type { CategoryDraft, CategoryFields, CategoryPayload } from "@/types/category";
import type { ActionResult } from "@/types/actions";

import Button from "../buttons/Button";
import { createCategoryWithoutRedirect, editCategoryWithoutRedirect } from "@/actions/categories";


export type PanelRef = {
    open: () => void;
    close: () => void;
};

type PanelProps = {
    mode: FormMode,
    initialDraft?: CategoryDraft,
    type: ItemType,
    onCreated: (category: CategoryDraft) => void;
};

const CategoryPanel = forwardRef<PanelRef, PanelProps>(
    function CategoryPanel({ mode, type, initialDraft, onCreated }, ref) {
        const [open, setOpen] = useState(false);

        const initialDraftItem = initialDraft ?? {
            id: "",
            name: "",
            plural: "",
            abbreviation: "",
        }

        const initialState: ActionResult<CategoryFields, CategoryPayload> = {
            success: false,
            message: "",
        };

        const action =
            mode === FormMode.CREATE
                ? createCategoryWithoutRedirect
                : editCategoryWithoutRedirect.bind(null, initialDraftItem.id);

        const [state, formAction, pending] = useActionState(
            action,
            initialState
        );

        useImperativeHandle(ref, () => ({
            open: () => setOpen(true),
            close: () => setOpen(false),
        }));

        if (!open) return null;

        const itemName = type.charAt(0).toUpperCase() + type.slice(1)

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                    <div className="w-full flex items-baseline justify-between mb-6">
                        <h2 className="text-xl font-bold">{mode === FormMode.CREATE ? "Create" : "Update"} {itemName}</h2>
                        <Button type="button" priority="tertiary" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>

                    <div className="w-full">
                        <CategoryForm
                            initialDraft={initialDraftItem}
                            mode={mode}
                            submitButtonText={{
                                default: `${mode === FormMode.CREATE ? "Create" : "Update"} ${itemName}`,
                                pending: `${mode === FormMode.CREATE ? "Creating" : "Updating"} ${itemName} …`,
                            }}
                            onSuccess={(item) => {
                                onCreated(item);
                                setOpen(false);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
);

export default CategoryPanel;