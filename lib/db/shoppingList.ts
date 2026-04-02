import { Prisma } from "@/app/generated/prisma/wasm";
import { prisma } from "@/lib/prisma";
import { generateUniqueRecipeSlug } from "@/lib/db/utils/generateSlug";

export async function getShoppingListItems(userId?: string) {

    const ingredientLines = await prisma.recipe_ingredients.findMany({
        where: {
            AND: [
                ...(userId ? [{ owner_id: userId }] : []),
                { on_shopping_list: true }
            ]
        },
        include: {
            units: true,
            ingredients: true
        },
    });

    return ingredientLines.map((recipe) => ({
        id: recipe.id,
        amount: Number(recipe.amount),
        unit: recipe.units,
        ingredient: recipe.ingredients,
        on_shopping_list: recipe.on_shopping_list,
        position: recipe.position,
        owner_id: recipe.owner_id
    }));
}

export async function updateShoppingListStatus(
    recipeIngredientId: string,
    onShoppingList: boolean
) {
    await prisma.recipe_ingredients.update({
        where: {
            id: recipeIngredientId,
        },
        data: {
            on_shopping_list: onShoppingList,
        },
    });
}

export async function setShoppingListStatusByUser(
    userId: string,
    onShoppingList: boolean
) {
    console.log("db upadte shopping list");

    await prisma.recipe_ingredients.updateMany({
        where: {
            owner_id: userId,
        },
        data: {
            on_shopping_list: onShoppingList,
        },
    });
}