"use server";

import { addUnit, deleteUnit, updateUnit } from '@/lib/db/units';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type Errors = {
    name?: string;
}

export type FormState = {
    errors: Errors;
}

export async function createUnit(prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();

    const name = formData.get("name") as string;
    const plural = formData.get("plural") as string;
    const abbreviation = formData.get("abbreviation") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await addUnit(name, plural, abbreviation, user.id);
    redirect('/');
}

export async function editUnit(id: string, prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();

    const name = formData.get("name") as string;
    const plural = formData.get("plural") as string;
    const abbreviation = formData.get("abbreviation") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await updateUnit(id, name, plural, abbreviation, user.id);
    redirect('/');
}

export async function removeUnit(id: string) {

    const user = await getCurrentDbUser();

    await deleteUnit(id, user.id);

    revalidatePath("/");
}