import { prisma } from "@/lib/prisma";
import { mapPrismaError } from "@/lib/errors/map-prisma-errors"
import { ForbiddenError, NotFoundError } from "@/lib/errors/app-errors";

export async function getIngredients(query?: string, userId?: string) {
    return prisma.ingredients.findMany({
        where: {
            AND: [
                userId
                    ? {
                        OR: [
                            { owner_id: userId },
                            // { owner_id: null }
                        ],
                    }
                    : {},
                query
                    ? {
                        OR: [
                            { name: { contains: query, mode: "insensitive" } },
                        ],
                    }
                    : {},
            ],
        },
    });
}

export async function getIngredientsByUserId(query?: string, userId?: string) {

    return prisma.ingredients.findMany({
        where: {
            ...(userId && { owner_id: userId }), // filter by userId if provided

            ...(query && { // filter by query if provided
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                ],
            }),
        },
    });
}

export async function getIngredientIdsFromNames(
    names: string[],
    userId?: string
): Promise<string[]> {
    try {
        if (names.length === 0) return [];

        const ingredientRecords = await prisma.ingredients.findMany({
            where: {
                name: { in: names },
                ...(userId ? { user_id: userId } : {}),
            },
            select: { id: true },
        });

        return ingredientRecords.map((ingredient) => ingredient.id);
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function getIngredient(id: string) {
    try {
        const ingredient = await prisma.ingredients.findUnique({
            where: { id },
        });

        if (!ingredient) {
            throw new NotFoundError("Ingredient not found");
        }

        return ingredient;
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function getIngredientIdFromName(name: string, userId?: string) {
    try {
        const ingredient = await prisma.ingredients.findFirst({
            where: {
                AND: {
                    name: name,
                    ...(userId ? { owner_id: userId } : {}),
                }
            },
        });

        if (!ingredient) {
            throw new NotFoundError("Ingredient not found");
        }

        return ingredient.id;
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function addIngredient(
    name: string,
    plural: string,
    userId: string
) {
    try {
        return await prisma.ingredients.create({
            data: {
                name,
                plural,
                users: {
                    connect: { id: userId },
                },
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function updateIngredient(
    id: string,
    name: string,
    plural: string,
    userId: string
) {
    const ingredient = await prisma.ingredients.findUnique({
        where: { id },
    });

    if (!ingredient) {
        throw new NotFoundError("Ingredient not found");
    }

    if (ingredient.owner_id !== userId) {
        throw new ForbiddenError("You are not allowed to edit this ingredient");
    }

    try {
        return prisma.ingredients.update({
            where: { id },
            data: { name, plural },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function deleteIngredient(id: string, userId: string) {
    try {
        return await prisma.ingredients.deleteMany({
            where: {
                id,
                owner_id: userId,
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}
