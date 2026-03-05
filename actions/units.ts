"use server";

import { addUnit, deleteUnit, updateUnit } from '@/lib/db/units';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type Errors = {
    name?: string;
    abbreviation?: string;
}

export type FormState = {
    errors: Errors;
}

export async function createUnit(prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();

    const name = formData.get("name") as string;
    const abbreviation = formData.get("abbreviation") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (!abbreviation) {
        errors.abbreviation = "Abbreviation is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await addUnit(name, abbreviation, user.id);
    redirect('/');
}

export async function editUnit(id: string, prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();

    const name = formData.get("name") as string;
    const abbreviation = formData.get("abbreviation") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (!abbreviation) {
        errors.abbreviation = "Abbreviation is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await updateUnit(id, name, abbreviation, user.id);
    redirect('/');
}

export async function removeUnit(id: string) {

    const user = await getCurrentDbUser();

    await deleteUnit(id, user.id);

    revalidatePath("/");
}