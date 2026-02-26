"use server";

import { addRecipe, deleteRecipe, updateRecipe } from '@/lib/db/recipes';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from "@clerk/nextjs/server";

export type Errors = {
    name?: string;
    subtitle?: string;
    image_uri?: string;
}

export type FormState = {
    errors: Errors;
}

export async function createRecipe(prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();

    const name = formData.get("name") as string;
    const subtitle = formData.get("subtitle") as string;
    const image_uri = formData.get("image_uri") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (!subtitle) {
        errors.subtitle = "Subtitle is required";
    }

    if (!image_uri) {
        errors.image_uri = "Image_uri is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await addRecipe(name, subtitle, image_uri, user.id);
    redirect('/');
}

export async function editRecipe(id: string, prevState: FormState, formData: FormData
): Promise<FormState> {

    const name = formData.get("name") as string;
    const subtitle = formData.get("subtitle") as string;
    const image_uri = formData.get("image_uri") as string;

    const errors: Errors = {};

    if (!name) {
        errors.name = "Name is required";
    }

    if (!subtitle) {
        errors.subtitle = "Subtitle is required";
    }

    if (!image_uri) {
        errors.image_uri = "Image_uri is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await updateRecipe(id, name, subtitle, image_uri);
    redirect('/recipes-db');
}

export async function removeRecipe(id: string) {
    const user = await getCurrentDbUser();

    await deleteRecipe(id, user.id);

    revalidatePath("/recipes-db");
}