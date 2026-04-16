"use server";

import { addRecipe, deleteRecipe, updateRecipe } from '@/lib/db/recipes';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { redirect } from 'next/navigation';

//errors
import { errorToActionResult } from "@/lib/errors/error-to-action-result";
import { ActionResult } from "@/types/actions";
import { RecipeFields, RecipePayload } from '@/types/recipe';

export type Errors = {
    name?: string;
    subtitle?: string;
    image_uri?: string;
    category_ids?: string[];
    ingredient_ids?: string;
    group_names?: string;
    portions?: string;
    unit_ids?: string;
    amounts?: string;
    text?: string;
    hint?: string;
    form?: string;
}

export async function createRecipe(
    prevState: ActionResult<RecipeFields, RecipePayload>,
    formData: FormData
): Promise<ActionResult<RecipeFields, RecipePayload>> {
    const user = await getCurrentDbUser();

    if (!user) {
        throw new Error("You must be signed in.");
    }

    const name = (formData.get("name") as string | null)?.trim() ?? "";
    const subtitle = (formData.get("subtitle") as string | null)?.trim() ?? "";
    const image_uri = (formData.get("image_uri") as string | null)?.trim() ?? "";

    const is_public = formData.get("is_public") === "on";
    const groups_enabled = formData.get("groups_enabled") === "on";

    const category_ids = formData.getAll("category_ids") as string[];

    const portions = (formData.get("portions") as string | null)?.trim() ?? "";
    const all_group_names = (formData.getAll("all_group_names") as string[]).map((g) => g.trim());
    const group_names = (formData.getAll("group_names") as string[]).map((g) => g.trim());
    const amounts = formData.getAll("amounts").map((p) => Number(p));
    const unit_ids = formData.getAll("unit_ids") as string[];
    const ingredient_ids = formData.getAll("ingredient_ids") as string[];
    const positions = formData.getAll("positions").map((p) => Number(p));

    const step_texts = (formData.getAll("step_texts") as string[]).map((s) => s.trim());
    const step_hints = (formData.getAll("step_hints") as string[]).map((s) => s.trim());

    const fieldErrors: Partial<RecipeFields> = {};

    if (!name) fieldErrors.name = "Name is required";
    if (!subtitle) fieldErrors.subtitle = "Subtitle is required";
    if (!image_uri) fieldErrors.image_uri = "Image uri is required";
    if (!portions) fieldErrors.portions = "Portions are required";

    if (ingredient_ids.length === 0) {
        fieldErrors.ingredient_ids = "At least one ingredient required";
    }

    // if (unit_ids.length === 0) {
    //     fieldErrors.unit_ids = "No unit selected";
    // }

    // if (amounts.length === 0) {
    //     fieldErrors.amounts = "Amount is required";
    // } else if (amounts.some((amount) => !Number.isFinite(amount))) {
    //     fieldErrors.amounts = "One or more amounts are invalid";
    // }

    if (
        ingredient_ids.length !== unit_ids.length ||
        ingredient_ids.length !== amounts.length ||
        ingredient_ids.length !== positions.length ||
        ingredient_ids.length !== group_names.length
    ) {
        fieldErrors.amounts = "Ingredient data is incomplete";
    }

    if (groups_enabled) {
        if (all_group_names.length === 0) {
            fieldErrors.group_names = "At least one group is required";
        } else if (all_group_names.some((g) => g === "")) {
            fieldErrors.group_names = "One of your groups has no name";
        } else {
            const normalized = all_group_names.map((g) => g.toLowerCase());

            if (new Set(normalized).size !== normalized.length) {
                fieldErrors.group_names = "Your groups are not named uniquely";
            } else {
                const submittedGroups = new Set(
                    group_names.map((g) => g.trim().toLowerCase())
                );

                const hasEmptyGroup = normalized.some(
                    (groupName) => !submittedGroups.has(groupName)
                );

                if (hasEmptyGroup) {
                    fieldErrors.group_names = "Every group must contain at least one ingredient";
                }
            }
        }
    }

    if (Object.keys(fieldErrors).length > 0) {
        return {
            success: false,
            message: "Please correct the highlighted fields.",
            fieldErrors,
        };
    }

    const ingredient_lines = ingredient_ids.map((ingredient_id, i) => ({
        ingredient_id,
        unit_id: unit_ids[i],
        owner_id: user.id,
        amount: amounts[i],
        group_name: group_names[i],
        position: positions[i],
    }));

    const steps = step_texts
        .filter((text) => text !== "")
        .map((step_text, i) => ({
            step_index: i,
            text: step_text,
            hint: step_hints[i] || null,
        }));

    try {
        await addRecipe(
            name,
            subtitle,
            user.id,
            portions,
            image_uri,
            is_public,
            groups_enabled,
            category_ids,
            ingredient_lines,
            steps
        );

    } catch (error) {
        return errorToActionResult<RecipeFields, RecipePayload>(error);
    }

    redirect("/collection?toast=recipe-created");
}

export async function editRecipe(id: string, slug: string, prevState: ActionResult<RecipeFields, RecipePayload>, formData: FormData
): Promise<ActionResult<RecipeFields, RecipePayload>> {

    const user = await getCurrentDbUser();

    if (!user) {
        throw new Error("You must be signed in.");
    }

    const name = (formData.get("name") as string | null)?.trim() ?? "";
    const subtitle = (formData.get("subtitle") as string | null)?.trim() ?? "";
    const image_uri = (formData.get("image_uri") as string | null)?.trim() ?? "";

    const is_public = formData.get("is_public") === "on";
    const groups_enabled = formData.get("groups_enabled") === "on";

    const category_ids = formData.getAll("category_ids") as string[];

    const portions = (formData.get("portions") as string | null)?.trim() ?? "";
    const all_group_names = (formData.getAll("all_group_names") as string[]).map((g) => g.trim());
    const group_names = (formData.getAll("group_names") as string[]).map((g) => g.trim());
    const amounts = formData.getAll("amounts").map((p) => Number(p));
    const unit_ids = formData.getAll("unit_ids") as string[];
    const ingredient_ids = formData.getAll("ingredient_ids") as string[];
    const positions = formData.getAll("positions").map((p) => Number(p));

    const step_texts = (formData.getAll("step_texts") as string[]).map((s) => s.trim());
    const step_hints = (formData.getAll("step_hints") as string[]).map((s) => s.trim());

    const fieldErrors: Partial<RecipeFields> = {};

    if (!name) fieldErrors.name = "Name is required";
    if (!subtitle) fieldErrors.subtitle = "Subtitle is required";
    if (!image_uri) fieldErrors.image_uri = "Image uri is required";
    if (!portions) fieldErrors.portions = "Portions are required";

    if (ingredient_ids.length === 0) {
        fieldErrors.ingredient_ids = "At least one ingredient required";
    }

    if (
        ingredient_ids.length !== unit_ids.length ||
        ingredient_ids.length !== amounts.length ||
        ingredient_ids.length !== positions.length ||
        ingredient_ids.length !== group_names.length
    ) {
        fieldErrors.amounts = "Ingredient data is incomplete";
    }

    if (groups_enabled) {
        if (all_group_names.length === 0) {
            fieldErrors.group_names = "At least one group is required";
        } else if (all_group_names.some((g) => g === "")) {
            fieldErrors.group_names = "One of your groups has no name";
        } else {
            const normalized = all_group_names.map((g) => g.toLowerCase());

            if (new Set(normalized).size !== normalized.length) {
                fieldErrors.group_names = "Your groups are not named uniquely";
            } else {
                const submittedGroups = new Set(
                    group_names.map((g) => g.trim().toLowerCase())
                );

                const hasEmptyGroup = normalized.some(
                    (groupName) => !submittedGroups.has(groupName)
                );

                if (hasEmptyGroup) {
                    fieldErrors.group_names = "Every group must contain at least one ingredient";
                }
            }
        }
    }

    if (Object.keys(fieldErrors).length > 0) {
        return {
            success: false,
            message: "Please correct the highlighted fields.",
            fieldErrors,
        };
    }

    const ingredient_lines = ingredient_ids.map((ingredient_id, i) => ({
        ingredient_id,
        unit_id: unit_ids[i],
        owner_id: user.id,
        amount: amounts[i],
        group_name: group_names[i],
        position: positions[i],
    }));

    const steps = step_texts
        .filter((text) => text !== "")
        .map((step_text, i) => ({
            step_index: i,
            text: step_text,
            hint: step_hints[i] || null,
        }));

    try {
        await updateRecipe(
            id,
            name,
            subtitle,
            user.id,
            portions,
            image_uri,
            is_public,
            groups_enabled,
            category_ids,
            ingredient_lines,
            steps
        );
    } catch (error) {
        return errorToActionResult<RecipeFields, RecipePayload>(error);
    }

    redirect(`/collection/${slug}?toast=recipe-updated`);
}

export async function removeRecipe(id: string) {

    const user = await getCurrentDbUser();

    await deleteRecipe(id, user.id);

    redirect("/collection?toast=recipe-deleted");
}