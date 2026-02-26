import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getRecipes(query?: string) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    if (query) {
        return prisma.recipes.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { subtitle: { contains: query } },
                ],
            },
        });
    }
    return prisma.recipes.findMany();
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
    image_uri: string
) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return prisma.recipes.update({
        where: { id },
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
