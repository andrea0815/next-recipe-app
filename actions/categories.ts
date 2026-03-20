"use server";

import { addCategory, deleteCategory, updateCategory } from '@/lib/db/categories';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type Errors = {
    name?: string;
}

export type FormState = {
    errors: Errors;
}

export async function createCategory(prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();
    if (!user) {
        redirect('/');
    }

    const name = formData.get("name") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await addCategory(name, user.id);
    redirect('/');
}

export async function editCategory(id: string, prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();
    if (!user) {
        redirect('/');
    }

    const name = formData.get("name") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await updateCategory(id, name, user.id);
    redirect('/');
}

export async function removeCategory(id: string) {

    const user = await getCurrentDbUser();
    if (!user) {
        redirect('/');
    }

    await deleteCategory(id, user.id);

    revalidatePath("/");
}