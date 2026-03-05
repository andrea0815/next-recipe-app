import { Prisma } from "@/app/generated/prisma/wasm";
import { prisma } from "@/lib/prisma";
import type { IngredientLineInput } from "@/types/recipe";

export async function getUserRecipes(query?: string, userId?: string) {
    return prisma.recipes.findMany({
        where: {
            ...(userId && { owner_id: userId }), // filter by userId if provided

            ...(query && { // filter by query if provided
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { subtitle: { contains: query, mode: "insensitive" } },
                ],
            }),
        },
    });
}

export async function getRecipe(id: string) {
    return prisma.recipes.findUnique({
        where: { id },
    });
}

export async function addRecipe(
    name: string,
    subtitle: string,
    is_public: boolean,
    image_uri: string,
    userId: string,
    categoryIds: string[],
    ingredient_lines: IngredientLineInput[]

) {
    return prisma.recipes.create({
        data: {
            name,
            subtitle,
            is_public,
            image_uri,
            users: {
                connect: { id: userId },
            },
            recipe_categories: {
                create: categoryIds.map((categoryId) => ({
                    // recipe_id is implied because we're inside recipes.create()
                    categories: { connect: { id: categoryId } },
                }))
            },
            recipe_ingredients: {
                create: ingredient_lines.map((line) => ({
                    ingredient_id: line.ingredient_id,
                    unit_id: line.unit_id,
                    amount: new Prisma.Decimal(line.amount), // safe Decimal
                    on_shopping_list: line.on_shopping_list ?? false,
                })),
            },
        },
    });
}

export async function updateRecipe(
    id: string,
    name: string,
    subtitle: string,
    is_public: boolean,
    image_uri: string,
    userId: string,
    categoryIds: string[]
) {
    return prisma.recipes.update({
        where: {
            id,
            owner_id: userId,
        },
        data: {
            name,
            subtitle,
            is_public,
            image_uri,
            recipe_categories: {
                deleteMany: {}, // deletes all joins for this recipe (scoped by parent)
                create: categoryIds.map((categoryId) => ({
                    categories: { connect: { id: categoryId } },
                })),
            },
        },
    });
}

export async function deleteRecipe(id: string, userId: string) {
    return prisma.recipes.deleteMany({
        where: {
            id,
            owner_id: userId,
        },
    });
}
