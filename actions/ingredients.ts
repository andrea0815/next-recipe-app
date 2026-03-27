"use server";

import { addIngredient, deleteIngredient, updateIngredient } from '@/lib/db/ingredients';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import type { IngredientFields } from '@/types/ingredient';

//errors
import { ValidationError } from "@/lib/errors/app-errors";
import { errorToActionResult } from "@/lib/errors/error-to-action-result";
import { ActionResult } from "@/lib/actions/action-result";


export async function createIngredient(
    prevState: ActionResult<IngredientFields>,
    formData: FormData
): Promise<ActionResult<IngredientFields>> {
    try {
        const user = await getCurrentDbUser();

        const name = String(formData.get("name") ?? "").trim();
        const plural = String(formData.get("plural") ?? "").trim();

        const fieldErrors: Partial<IngredientFields> = {};

        if (!name) {
            fieldErrors.name = "Name is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidationError("Please correct the highlighted fields.", fieldErrors);
        }

        await addIngredient(name, plural, user.id);
    } catch (error) {
        return errorToActionResult<IngredientFields>(error);
    }
    redirect("/profile/ingredients");
}

export async function editIngredient(
    id: string,
    prevState: ActionResult<IngredientFields>,
    formData: FormData
): Promise<ActionResult<IngredientFields>> {
    try {
        const user = await getCurrentDbUser();

        const name = String(formData.get("name") ?? "").trim();
        const plural = String(formData.get("plural") ?? "").trim();

        const fieldErrors: Partial<IngredientFields> = {};

        if (!name) {
            fieldErrors.name = "Name is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidationError(
                "Please correct the highlighted fields.",
                fieldErrors
            );
        }

        await updateIngredient(id, name, plural, user.id);
    } catch (error) {
        return errorToActionResult<IngredientFields>(error);
    }

    redirect("/profile/ingredients");
}

export async function removeIngredient(id: string) {
    try {
        const user = await getCurrentDbUser();

        await deleteIngredient(id, user.id);

        revalidatePath("/profile/ingredients");

        return {
            success: true,
            message: "Ingredient deleted successfully.",
        };
    } catch (error) {
        return errorToActionResult(error);
    }
}