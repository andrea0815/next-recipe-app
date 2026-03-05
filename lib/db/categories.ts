import { prisma } from "@/lib/prisma";

export async function getCategories(query?: string, userId?: string) {

    return prisma.categories.findMany({
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

export async function getCategory(id: string) {
    return prisma.categories.findUnique({
        where: { id },
    });
}

export async function addCategory(
    name: string,
    userId: string
) {
    return prisma.categories.create({
        data: {
            name,
            users: {
                connect: { id: userId },
            },
        },
    });
}

export async function updateCategory(
    id: string,
    name: string,
    userId: string
) {
    return prisma.categories.update({
        where: {
            id,
            owner_id: userId,
        },
        data: { name },
    });
}

export async function deleteCategory(id: string, userId: string) {
    return prisma.categories.deleteMany({
        where: {
            id,
            owner_id: userId,
        },
    });
}
