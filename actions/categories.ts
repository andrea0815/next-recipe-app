"use server";

import { addCategory, deleteCategory, updateCategory } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { CategoryFields } from "@/types/category";

// errors
import { ValidationError } from "@/lib/errors/app-errors";
import { errorToActionResult } from "@/lib/errors/error-to-action-result";
import { ActionResult } from "@/types/actions";

export async function createCategory(
    prevState: ActionResult<CategoryFields>,
    formData: FormData
): Promise<ActionResult<CategoryFields>> {
    try {
        const user = await getCurrentDbUser();

        const name = String(formData.get("name") ?? "").trim();

        const fieldErrors: Partial<CategoryFields> = {};

        if (!name) {
            fieldErrors.name = "Name is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidationError(
                "Please correct the highlighted fields.",
                fieldErrors
            );
        }

        await addCategory(name, user.id);
    } catch (error) {
        return errorToActionResult<CategoryFields>(error);
    }

    redirect("/profile/categories");
}

export async function editCategory(
    id: string,
    prevState: ActionResult<CategoryFields>,
    formData: FormData
): Promise<ActionResult<CategoryFields>> {
    try {
        const user = await getCurrentDbUser();

        const name = String(formData.get("name") ?? "").trim();

        const fieldErrors: Partial<CategoryFields> = {};

        if (!name) {
            fieldErrors.name = "Name is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidationError(
                "Please correct the highlighted fields.",
                fieldErrors
            );
        }

        await updateCategory(id, name, user.id);
    } catch (error) {
        return errorToActionResult<CategoryFields>(error);
    }

    redirect("/profile/categories");
}

export async function removeCategory(id: string) {
    try {
        const user = await getCurrentDbUser();

        await deleteCategory(id, user.id);

        revalidatePath("/profile/categories");

        return {
            success: true,
            message: "Category deleted successfully.",
        };
    } catch (error) {
        return errorToActionResult(error);
    }
}