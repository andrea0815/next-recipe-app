"use client"

import Form from 'next/form';
import React from 'react';
import { removeRecipe } from "@/actions/recipes";
import Button from '@/components/buttons/Button';
import ConfirmAction from '@/components/errors/ConfirmaAction';
import IconTrash from '@/components/icons/IconTrash';

export default function DeleteButton({ itemId }: { itemId: string }) {

    const removeById = async (id: string) => {
        await removeRecipe(id);
    }

    return (
        <ConfirmAction
            title="Delete item?"
            description="This action cannot be undone."
            confirmText="Delete"
            onConfirm={removeById.bind(null, itemId)}
            trigger={(openConfirm) => (
                <Button onClick={openConfirm} color="red" size='small' priority="secondary">
                    <IconTrash /> Delete Recipe
                </Button>
            )}
        />
    );
}
