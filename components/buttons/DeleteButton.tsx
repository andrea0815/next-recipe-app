"use client"

import { removeRecipe } from "@/actions/recipes";
import Button from '@/components/buttons/Button';
import ConfirmAction from '@/components/errors/ConfirmaAction';
import IconTrash from '@/components/icons/IconTrash';
import { useState } from "react";
import IconSpinner from "../icons/IconSpinner";

export default function DeleteButton({ itemId }: { itemId: string }) {

    const [pending, setPending] = useState(false);

    const removeById = async (id: string) => {

        if (itemId !== "") {
            setPending(true)
            await removeRecipe(id);
            setPending(false)
        }
    }

    return (
        <ConfirmAction
            title="Delete this recipe?"
            description="This action cannot be undone."
            confirmText="Delete"
            onConfirm={removeById.bind(null, itemId)}
            trigger={(openConfirm) => (
                <Button onClick={openConfirm} color="red" size='small' priority="secondary">
                    {pending ? <IconSpinner /> : <IconTrash />}
                    Delete Recipe
                </Button>
            )}
        />
    );
}
