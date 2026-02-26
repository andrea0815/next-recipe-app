import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getRecipes(query?: string, userId?: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return prisma.recipes.findUnique({
        where: { id },
    });
}

export async function addRecipe(
    name: string,
    subtitle: string,
    image_uri: string,
    userId: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return prisma.recipes.create({
        data: {
            name,
            subtitle,
            image_uri,
            users: {
                connect: { id: userId },
            },
        },
    });
}

export async function updateRecipe(
    id: string,
    name: string,
    subtitle: string,
    image_uri: string,
    userId: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return prisma.recipes.update({
        where: {
            id,
            owner_id: userId,
        },
        data: { name, subtitle, image_uri },
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
