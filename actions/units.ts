"use server";

import { addUnit, deleteUnit, updateUnit } from "@/lib/db/units";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { UnitFieldErrors, UnitFields, UnitPayload } from "@/types/unit";

import { ValidationError } from "@/lib/errors/app-errors";
import { errorToActionResult } from "@/lib/errors/error-to-action-result";
import { ActionResult } from "@/types/actions";

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

export async function createUnitWithoutRedirect(
    prevState: ActionResult<UnitFields, UnitPayload>,
    formData: FormData
): Promise<ActionResult<UnitFields, UnitPayload>> {
    try {
        const user = await getCurrentDbUser();

        if (!user) {
            throw new Error("You must be signed in.");
        }

        const name = String(formData.get("name") ?? "").trim();
        const plural = String(formData.get("plural") ?? "").trim();
        const abbreviation = String(formData.get("abbreviation") ?? "").trim();


        const fieldErrors: Partial<UnitFieldErrors> = {};

        if (!name) {
            fieldErrors.name = "Name is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidationError("Please correct the highlighted fields.", fieldErrors);
        }

        const unit = await addUnit(name, plural, abbreviation, user.id);

        return {
            success: true,
            message: "Unit created.",
            data: {
                id: unit.id,
                name: unit.name,
                plural: unit.plural ?? "",
                abbreviation: unit.abbreviation ?? "",
            },
        };
    } catch (error) {
        return errorToActionResult<UnitFieldErrors, UnitPayload>(error);
    }
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

export async function editUnitWithoutRedirect(
    id: string,
    prevState: ActionResult<UnitFields, UnitPayload>,
    formData: FormData
): Promise<ActionResult<UnitFields, UnitPayload>> {
    try {
        const user = await getCurrentDbUser();

        if (!user) {
            throw new Error("You must be signed in.");
        }

        const name = String(formData.get("name") ?? "").trim();
        const plural = String(formData.get("plural") ?? "").trim();
        const abbreviation = String(formData.get("abbreviation") ?? "").trim();


        const fieldErrors: Partial<UnitFieldErrors> = {};

        if (!name) {
            fieldErrors.name = "Name is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidationError("Please correct the highlighted fields.", fieldErrors);
        }

        const unit = await updateUnit(id, name, plural, abbreviation, user.id);

        return {
            success: true,
            message: "Unit created.",
            data: {
                id: unit.id,
                name: unit.name,
                plural: unit.plural ?? "",
                abbreviation: unit.abbreviation ?? "",
            },
        };
    } catch (error) {
        return errorToActionResult<UnitFieldErrors, UnitPayload>(error);
    }
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