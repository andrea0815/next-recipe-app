import { prisma } from "@/lib/prisma";
import { mapPrismaError } from "@/lib/errors/map-prisma-errors";
import { ForbiddenError, NotFoundError } from "@/lib/errors/app-errors";

export async function getShoppingItemsByUser(userId?: string) {

    const ingredientLines = await prisma.shoppinglist.findMany({
        where: {
            ...(userId && { owner_id: userId }),
        },
        include: {
            recipe_ingredient: {
                include: {
                    ingredients: true,
                    units: true,
                },
            },
            recipe: {
                select: {
                    id: true,
                    name: true,
                    portions: true,
                },
            },
        },
    });

    return ingredientLines.map((listItem) => ({
        id: listItem.id,
        portions: Number(listItem.portions),
        amount: Number(listItem.recipe_ingredient.amount),
        unit: listItem.recipe_ingredient.units,
        ingredient: listItem.recipe_ingredient.ingredients,
        owner_id: listItem.owner_id,
        recipe: {
            name: listItem.recipe.name,
            id: listItem.recipe.id,
            portions: Number(listItem.recipe.portions),
        }
    }));
}

export async function addShoppingItem(
    portions: number,
    recipeId: string,
    recipeIngredientId: string,
    userId: string
) {
    try {
        return await prisma.shoppinglist.create({
            data: {
                portions,
                recipe: {
                    connect: { id: recipeId },
                },
                recipe_ingredient: {
                    connect: { id: recipeIngredientId },
                },
                user: {
                    connect: { id: userId },
                },
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function deleteShoppingItem(id: string, userId: string) {
    try {
        return await prisma.shoppinglist.deleteMany({
            where: {
                id,
                owner_id: userId,
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function deleteAllShoppingItems(userId: string) {
    try {
        return await prisma.shoppinglist.deleteMany({
            where: {
                owner_id: userId,
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function deleteManyShoppingItemsById(itemIds: string[], userId: string) {
    try {
        return await prisma.shoppinglist.deleteMany({
            where: {
                id: { in: itemIds },
                owner_id: userId,
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}