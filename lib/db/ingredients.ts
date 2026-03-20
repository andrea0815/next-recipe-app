import { prisma } from "@/lib/prisma";

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



export async function getIngredient(id: string) {
    return prisma.ingredients.findUnique({
        where: { id },
    });
}

export async function addIngredient(
    name: string,
    plural: string,
    userId: string
) {
    return prisma.ingredients.create({
        data: {
            name,
            plural,
            users: {
                connect: { id: userId },
            },
        },
    });
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
        throw new Error("Ingredient not found");
    }

    if (ingredient.owner_id !== userId) {
        throw new Error("You are not allowed to edit this ingredient");
    }

    return prisma.ingredients.update({
        where: { id },
        data: { name, plural },
    });
}

export async function deleteIngredient(id: string, userId: string) {
    return prisma.ingredients.deleteMany({
        where: {
            id,
            owner_id: userId,
        },
    });
}
