import { Prisma } from "@/app/generated/prisma/wasm";
import { prisma } from "@/lib/prisma";
import { generateUniqueRecipeSlug } from "@/lib/db/utils/generateSlug";

import type { IngredientLineInput, RecipeStep } from "@/types/recipe";

export async function getUserRecipes(query?: string, userId?: string) {
    const recipes = await prisma.recipes.findMany({
        where: {
            ...(userId && { owner_id: userId }),
            ...(query && {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { subtitle: { contains: query, mode: "insensitive" } },
                ],
            }),
        },
    });

    return recipes.map((recipe) => ({
        ...recipe,
        portions: Number(recipe.portions),
    }));
}

export async function getRecipeById(id: string) {
    const recipe = await prisma.recipes.findUnique({
        where: { id },
    });

    if (!recipe) return null;

    return {
        ...recipe,
        portions: Number(recipe.portions),
    };
}

export async function getRecipeBySlug(slug: string, userId?: string) {
    const recipe = await prisma.recipes.findFirst({
        where: {
            slug,
            OR: [
                { is_public: true },
                ...(userId ? [{ owner_id: userId }] : []),
            ],
        },
        include: {
            recipe_categories: {
                include: {
                    categories: true,
                },
            },
            recipe_ingredients: {
                include: {
                    ingredients: true,
                    units: true,
                },
            },
            recipe_steps: {
                orderBy: {
                    step_index: "asc",
                },
            },
        },
    });

    if (!recipe) return null;

    return {
        ...recipe,
        portions: Number(recipe.portions),
        recipe_ingredients: recipe.recipe_ingredients.map((ingredient) => ({
            ...ingredient,
            amount: Number(ingredient.amount),
        })),
    };
}

export async function addRecipe(
    name: string,
    subtitle: string,
    userId: string,
    portions: string,
    image_uri: string,
    is_public: boolean,
    groups_enabled: boolean,
    categoryIds: string[],
    ingredient_lines: IngredientLineInput[],
    steps: RecipeStep[],

) {
    const slug = await generateUniqueRecipeSlug(name, userId);

    return prisma.recipes.create({
        data: {
            name,
            subtitle,
            is_public,
            groups_enabled,
            portions,
            image_uri,
            slug,
            users: {
                connect: { id: userId },
            },
            recipe_categories: {
                create: categoryIds.map((categoryId) => ({
                    categories: { connect: { id: categoryId } },
                }))
            },
            recipe_ingredients: {
                create: ingredient_lines.map((line) => ({
                    ingredient_id: line.ingredient_id,
                    unit_id: line.unit_id,
                    owner_id: line.owner_id,
                    amount: new Prisma.Decimal(line.amount),
                    group_name: line.group_name,
                    position: new Prisma.Decimal(line.position),
                    on_shopping_list: line.on_shopping_list ?? false,
                })),
            },
            recipe_steps: {
                create: steps.map((step) => ({
                    step_index: step.step_index,
                    text: step.text,
                    hint: step.hint,
                })),
            },
        },
    });
}

export async function updateRecipe(
    id: string,
    name: string,
    subtitle: string,
    userId: string,
    portions: string,
    image_uri: string,
    is_public: boolean,
    groups_enabled: boolean,
    categoryIds: string[],
    ingredient_lines: IngredientLineInput[],
    steps: RecipeStep[],
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
            groups_enabled,
            portions,
            users: {
                connect: { id: userId },
            },
            recipe_categories: {
                deleteMany: {},
                create: categoryIds.map((categoryId) => ({
                    categories: { connect: { id: categoryId } },
                })),
            },
            recipe_ingredients: {
                deleteMany: {},
                create: ingredient_lines.map((line) => ({
                    ingredient_id: line.ingredient_id,
                    unit_id: line.unit_id,
                    owner_id: line.owner_id,
                    amount: new Prisma.Decimal(line.amount),
                    group_name: line.group_name,
                    position: new Prisma.Decimal(line.position),
                    on_shopping_list: line.on_shopping_list ?? false,
                })),
            },
            recipe_steps: {
                deleteMany: {},
                create: steps.map((step) => ({
                    step_index: step.step_index,
                    text: step.text,
                    hint: step.hint,
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
