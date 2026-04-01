"use client"

import Form from 'next/form';
import React from 'react';
import { removeRecipe } from "@/actions/recipes";
import Button from '@/components/buttons/Button';


export default function DeleteButton({ itemId }: { itemId: string }) {

    const removeById = async (id: string) => {
        await removeRecipe(id);
    }

    return (
        <Form action={removeById.bind(null, itemId)}>
            <Button type="submit" color='red' size='small'>
                Delete
            </Button>
        </Form>
    );
}
