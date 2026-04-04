"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import AddIngredientPanelForm from "@/components/ingredient/AddIngredientPanelForm";
import { FormMode } from "@/types/general";
import type { IngredientDraft } from "@/types/ingredient";
import Button from "../buttons/Button";

export type AddIngredientPanelRef = {
    open: () => void;
    close: () => void;
};

type AddIngredientPanelProps = {
    onCreated: (ingredient: IngredientDraft) => void;
};

const AddIngredientPanel = forwardRef<AddIngredientPanelRef, AddIngredientPanelProps>(
    function AddIngredientPanel({ onCreated }, ref) {
        const [open, setOpen] = useState(false);

        useImperativeHandle(ref, () => ({
            open: () => setOpen(true),
            close: () => setOpen(false),
        }));

        const emptyDraft: IngredientDraft = {
            id: "",
            name: "",
            plural: "",
        };

        if (!open) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                    <div className="w-full flex items-baseline justify-between mb-6">
                        <h2 className="text-xl font-bold">Create Ingredient</h2>
                        <Button type="button" priority="tertiary" onClick={() => setOpen(false)}>
                            Close
                        </Button>
                    </div>

                    <div className="w-full">
                        <AddIngredientPanelForm
                            initialDraft={emptyDraft}
                            mode={FormMode.CREATE}
                            submitButtonText={{
                                default: "Create ingredient",
                                pending: "Creating ingredient …",
                            }}
                            onCreated={(ingredient) => {
                                onCreated(ingredient);
                                setOpen(false);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
);

export default AddIngredientPanel;