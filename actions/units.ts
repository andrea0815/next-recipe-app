"use server";

import { addUnit, deleteUnit, updateUnit } from "@/lib/db/units";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { UnitFieldErrors, UnitFields } from "@/types/unit";

import { ValidationError } from "@/lib/errors/app-errors";
import { errorToActionResult } from "@/lib/errors/error-to-action-result";
import { ActionResult } from "@/lib/actions/action-result";

export async function createUnit(
    prevState: ActionResult<UnitFieldErrors>,
    formData: FormData
): Promise<ActionResult<UnitFieldErrors>> {
    try {
        const user = await getCurrentDbUser();

        const name = String(formData.get("name") ?? "").trim();
        const plural = String(formData.get("plural") ?? "").trim();
        const abbreviation = String(formData.get("abbreviation") ?? "").trim();

        const fieldErrors: Partial<UnitFieldErrors> = {};

        if (!name) {
            fieldErrors.name = "Name is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidationError(
                "Please correct the highlighted fields.",
                fieldErrors
            );
        }

        await addUnit(name, plural, abbreviation, user.id);
    } catch (error) {
        return errorToActionResult<UnitFieldErrors>(error);
    }

    redirect("/profile/units");
}

export async function editUnit(
    id: string,
    prevState: ActionResult<UnitFieldErrors>,
    formData: FormData
): Promise<ActionResult<UnitFieldErrors>> {
    try {
        const user = await getCurrentDbUser();

        const name = String(formData.get("name") ?? "").trim();
        const plural = String(formData.get("plural") ?? "").trim();
        const abbreviation = String(formData.get("abbreviation") ?? "").trim();

        const fieldErrors: Partial<UnitFieldErrors> = {};

        if (!name) {
            fieldErrors.name = "Name is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidationError(
                "Please correct the highlighted fields.",
                fieldErrors
            );
        }

        await updateUnit(id, name, plural, abbreviation, user.id);
    } catch (error) {
        return errorToActionResult<UnitFieldErrors>(error);
    }

    redirect("/profile/units");
}

export async function removeUnit(id: string) {
    try {
        const user = await getCurrentDbUser();

        await deleteUnit(id, user.id);
        revalidatePath("/profile/units");

        return {
            success: true,
            message: "Unit deleted successfully.",
        };
    } catch (error) {
        return errorToActionResult(error);
    }
}