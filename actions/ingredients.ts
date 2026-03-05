"use server";

import { addIngredient, deleteIngredient, updateIngredient } from '@/lib/db/ingredients';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type Errors = {
    name?: string;
    plural?: string;
}

export type FormState = {
    errors: Errors;
}

export async function createIngredient(prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();

    const name = formData.get("name") as string;
    const plural = formData.get("plural") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await addIngredient(name, plural, user.id);
    redirect('/');
}

export async function editIngredient(id: string, prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();

    const name = formData.get("name") as string;
    const plural = formData.get("plural") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await updateIngredient(id, name, plural, user.id);
    redirect('/');
}

export async function removeIngredient(id: string) {

    const user = await getCurrentDbUser();

    await deleteIngredient(id, user.id);

    revalidatePath("/ingredients-db");
}