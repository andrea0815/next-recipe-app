import { Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { generateUniqueRecipeSlug } from "@/lib/db/utils/generateSlug";

import type { IngredientLineInput, RecipeStep } from "@/types/recipe";

export async function getUserRecipes({
    query,
    userId,
    categoryIds,
    ingredientIds,
    cursor,
    take = 12,
}: {
    query?: string;
    userId?: string;
    categoryIds?: string[];
    ingredientIds?: string[];
    cursor?: string;
    take?: number;
} = {}) {
    const recipes = await prisma.recipes.findMany({
        where: {
            ...(userId && { owner_id: userId }),
            ...(query && {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { subtitle: { contains: query, mode: "insensitive" } },

                    { users: { username: { contains: query, mode: "insensitive" } } },
                    {
                        recipe_categories: {
                            some: {
                                categories: {
                                    name: { contains: query, mode: "insensitive" },
                                },
                            },
                        },
                    },
                ],
            }),
            ...(categoryIds && categoryIds.length > 0 && {
                recipe_categories: {
                    some: {
                        category_id: {
                            in: categoryIds,
                        },
                    },
                },
            }),
            ...(ingredientIds && ingredientIds.length > 0 && {
                recipe_ingredients: {
                    some: {
                        ingredient_id: {
                            in: ingredientIds,
                        },
                    },
                },
            }),
        },
        orderBy: [
            { created_at: "desc" },
            { id: "desc" },
        ],
        take: take + 1,
        ...(cursor && {
            cursor: { id: cursor },
            skip: 1,
        }),
        include: {
            recipe_categories: {
                include: {
                    categories: true,
                },
            },
        },
    });

    const hasMore = recipes.length > take;
    const items = hasMore ? recipes.slice(0, take) : recipes;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return {
        recipes: items.map((recipe) => ({
            id: recipe.id,
            name: recipe.name,
            slug: recipe.slug,
            subtitle: recipe.subtitle,
            is_public: recipe.is_public,
            image_uri: recipe.image_uri,
            owner_id: recipe.owner_id,
            categories: recipe.recipe_categories.map((rc) => ({
                id: rc.categories.id,
                name: rc.categories.name,
                owner_id: rc.categories.owner_id,
            })),
        })),
        nextCursor,
        hasMore,
    };
}

export async function getOtherRecipes({
    query,
    userId,
    categoryIds,
    ingredientIds,
    cursor,
    take = 12,
}: {
    query?: string;
    userId?: string;
    categoryIds?: string[];
    ingredientIds?: string[];
    cursor?: string;
    take?: number;
} = {}) {
    const recipes = await prisma.recipes.findMany({
        where: {
            ...(userId && {
                owner_id: {
                    not: userId,
                },
            }),
            is_public: true,
            ...(query && {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { subtitle: { contains: query, mode: "insensitive" } },

                    { users: { username: { contains: query, mode: "insensitive" } } },
                    {
                        recipe_categories: {
                            some: {
                                categories: {
                                    name: { contains: query, mode: "insensitive" },
                                },
                            },
                        },
                    },
                ],
            }),
            ...(categoryIds && categoryIds.length > 0 && {
                recipe_categories: {
                    some: {
                        category_id: {
                            in: categoryIds,
                        },
                    },
                },
            }),
            ...(ingredientIds && ingredientIds.length > 0 && {
                recipe_ingredients: {
                    some: {
                        ingredient_id: {
                            in: ingredientIds,
                        },
                    },
                },
            }),
        },
        orderBy: [
            { created_at: "desc" },
            { id: "desc" },
        ],
        take: take + 1,
        ...(cursor && {
            cursor: { id: cursor },
            skip: 1,
        }),
        include: {
            recipe_categories: {
                include: {
                    categories: true,
                },
            },
            users: {
                select: {
                    username: true,
                },
            },
        },
    });

    const hasMore = recipes.length > take;
    const items = hasMore ? recipes.slice(0, take) : recipes;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return {
        recipes: items.map((recipe) => ({
            id: recipe.id,
            name: recipe.name,
            slug: recipe.slug,
            subtitle: recipe.subtitle,
            is_public: recipe.is_public,
            image_uri: recipe.image_uri,
            owner_id: recipe.owner_id,
            username: recipe.users.username,
            categories: recipe.recipe_categories.map((rc) => ({
                id: rc.categories.id,
                name: rc.categories.name,
                owner_id: rc.categories.owner_id,
            })),
        })),
        nextCursor,
        hasMore,
    };
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
                    shoppinglists: userId
                        ? {
                            where: {
                                owner_id: userId,
                            },
                            select: {
                                id: true,
                            },
                        }
                        : false,
                },
            },
            recipe_steps: {
                orderBy: {
                    step_index: "asc",
                },
            },
            users: {
                select: {
                    username: true,
                },
            },
        },
    });

    if (!recipe) return null;

    return {
        ...recipe,
        portions: Number(recipe.portions),
        username: recipe.users.username,
        recipe_ingredients: recipe.recipe_ingredients.map((ingredient) => {
            const { shoppinglists, ...rest } = ingredient;
            return {
                ...rest,
                amount: Number(ingredient.amount),
                on_shopping_list: userId ? shoppinglists.length > 0 : false,
            };
        })
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

export async function deleteRecipe(id: string, userId: string) {
    return prisma.recipes.deleteMany({
        where: {
            id,
            owner_id: userId,
        },
    });
}
