"use server";

import { addRecipe, deleteRecipe, updateRecipe } from '@/lib/db/recipes';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { IngredientLineInput } from '@/types/recipe';

export type Errors = {
    name?: string;
    subtitle?: string;
    image_uri?: string;
    category_ids?: string[];
    ingredient_ids?: string;
    unit_ids?: string;
    amounts?: string;
}

export type FormState = {
    errors: Errors;
}

export async function createRecipe(prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();

    const name = formData.get("name") as string;
    const subtitle = formData.get("subtitle") as string;
    const is_public = formData.get("is_public") === "on";
    const image_uri = formData.get("image_uri") as string;
    const category_ids = (formData.getAll("category_ids") as string[]) || [];
    const ingredient_ids = formData.getAll("ingredient_ids") as string[];
    const unit_ids = formData.getAll("unit_ids") as string[];
    const amounts = formData.getAll("amounts") as string[];

    const ingredient_lines = ingredient_ids.map((ingredient_id, i) => ({
        ingredient_id,
        unit_id: unit_ids[i],
        amount: amounts[i], // keep as string; convert to Decimal in addRecipe
    }));

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

    if (!ingredient_ids || ingredient_ids.length === 0) {
        errors.ingredient_ids = "No ingredient selected";
    }

    if (!unit_ids || unit_ids.length === 0) {
        errors.unit_ids = "No unit selected";
    }

    if (!amounts || amounts.length === 0) {
        errors.amounts = "Amount is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    await addRecipe(
        name,
        subtitle,
        is_public,
        image_uri,
        user.id,
        category_ids,
        ingredient_lines
    )
    redirect('/');
}

export async function editRecipe(id: string, prevState: FormState, formData: FormData
): Promise<FormState> {

    const user = await getCurrentDbUser();

    const name = formData.get("name") as string;
    const subtitle = formData.get("subtitle") as string;
    const is_public = formData.get("is_public") === "on";
    const image_uri = formData.get("image_uri") as string;
    const category_ids = (formData.getAll("category_ids") as string[]) || [];

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

    await updateRecipe(id, name, subtitle, is_public, image_uri, user.id, category_ids);
    redirect('/');
}

export async function removeRecipe(id: string) {

    const user = await getCurrentDbUser();

    await deleteRecipe(id, user.id);

    revalidatePath("/");
}