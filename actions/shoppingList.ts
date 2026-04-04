"use server";

import { ShoppingItemFields } from '@/types/shoppingList';
import { getCurrentDbUser } from '@/lib/auth/getCurrentDbUser';
import { addShoppingItem, deleteShoppingItem, deleteAllShoppingItems, deleteManyShoppingItemsById } from '@/lib/db/shoppingList';
import { ActionResult } from '@/types/actions';
import { ValidationError } from '@/lib/errors/app-errors';
import { errorToActionResult } from "@/lib/errors/error-to-action-result";
import { revalidatePath } from "next/cache";


export async function createShoppingItem(
    portions: number,
    recipeId: string,
    recipeIngredientId: string
): Promise<ActionResult<ShoppingItemFields>> {
    try {
        const user = await getCurrentDbUser();

        if (!user) {
            throw new Error("You must be signed in.");
        }

        const portion = portions;
        const recipe_id = recipeId;
        const recipe_ingredient_id = recipeIngredientId;

        const fieldErrors: Partial<ShoppingItemFields> = {};

        if (!recipeIngredientId) {
            fieldErrors.portions = "Portions must be greater than 0";
        }

        if (!recipeIngredientId) {
            fieldErrors.recipe_ingredient_id = "Recipe ingredient is required";
        }

        if (!recipeId) {
            fieldErrors.recipe_id = "Recipe is required";
        }

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidationError(
                "Unable to add item to shopping list.",
                fieldErrors
            );
        }

        await addShoppingItem(portion, recipe_id, recipe_ingredient_id, user.id);

        return {
            success: true,
            message: "Shopping item created.",
        };
    } catch (error) {
        return errorToActionResult<ShoppingItemFields>(error);
    }
}

export async function removeShoppingItem(id: string) {
    try {
        const user = await getCurrentDbUser();

        await deleteShoppingItem(id, user.id);

        revalidatePath("/profile/shopping-list");

        return {
            success: true,
            message: "Removed Item from Shopping List.",
        };
    } catch (error) {
        return errorToActionResult(error);
    }
}

export async function removeAllShoppingItems(id: string) {
    try {
        const user = await getCurrentDbUser();

        await deleteAllShoppingItems(id);

        revalidatePath("/profile/shopping-list");

        return {
            success: true,
            message: "Removed Item from Shopping List.",
        };
    } catch (error) {
        return errorToActionResult(error);
    }
}

export async function removeCheckedShoppingItems(formData: FormData): Promise<void> {
    try {
        const user = await getCurrentDbUser();

        if (!user) {
            throw new Error("You must be signed in.");
        }

        const itemIds = formData.getAll("shoppingItemIds").map(String);

        if (itemIds.length === 0) return;

        await deleteManyShoppingItemsById(itemIds, user.id);
        revalidatePath("/profile/shopping-list");

    } catch (error) {
        console.error(error);
        throw error;
    }
}