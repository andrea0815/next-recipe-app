import { prisma } from "@/lib/prisma";
import { mapPrismaError } from "@/lib/errors/map-prisma-errors";
import { ForbiddenError, NotFoundError } from "@/lib/errors/app-errors";

export async function getCategories(query?: string, userId?: string) {
    return prisma.categories.findMany({
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

export async function getCategoriesByUserId(query?: string, userId?: string) {
    return prisma.categories.findMany({
        where: {
            ...(userId && { owner_id: userId }),

            ...(query && {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                ],
            }),
        },
    });
}

export async function getCategory(id: string) {
    try {
        const category = await prisma.categories.findUnique({
            where: { id },
        });

        if (!category) {
            throw new NotFoundError("Category not found");
        }

        return category;
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function addCategory(name: string, userId: string) {
    try {
        return await prisma.categories.create({
            data: {
                name,
                users: {
                    connect: { id: userId },
                },
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function updateCategory(
    id: string,
    name: string,
    userId: string
) {
    const category = await prisma.categories.findUnique({
        where: { id },
    });

    if (!category) {
        throw new NotFoundError("Category not found");
    }

    if (category.owner_id !== userId) {
        throw new ForbiddenError("You are not allowed to edit this category");
    }

    try {
        return await prisma.categories.update({
            where: { id },
            data: { name },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function deleteCategory(id: string, userId: string) {
    try {
        return await prisma.categories.deleteMany({
            where: {
                id,
                owner_id: userId,
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}