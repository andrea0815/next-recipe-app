"use client"

import Form from 'next/form';
import React from 'react';
import { removeRecipe } from "@/actions/recipes";


export default function DeleteButton({ itemId }: { itemId: string }) {

    const removeById = async (id: string) => {
        await removeRecipe(id);
    }

    return (
        <Form action={removeById.bind(null, itemId)}>
            <button
                type="submit"
                className="p-2 text-white bg-red-500 rounded disabled:bg-gray-500 cursor-pointer"
            >
                Delete
            </button>
        </Form>
    );
}
