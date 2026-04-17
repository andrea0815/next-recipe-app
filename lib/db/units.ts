import { prisma } from "@/lib/prisma";
import { mapPrismaError } from "@/lib/errors/map-prisma-errors";
import { ForbiddenError, NotFoundError } from "@/lib/errors/app-errors";

export async function getUnits(query?: string, userId?: string) {
    return prisma.units.findMany({
        where: {
            AND: [
                userId
                    ? {
                        OR: [
                            { owner_id: userId },
                            { owner_id: null }
                        ],
                    }
                    : {},
                query
                    ? {
                        OR: [
                            { name: { contains: query, mode: "insensitive" } },
                            { abbreviation: { contains: query, mode: "insensitive" } },
                            { plural: { contains: query, mode: "insensitive" } },
                        ],
                    }
                    : {},
            ],
        },
    });
}

export async function getUnitsByUserId(query?: string, userId?: string) {
    return prisma.units.findMany({
        where: {
            ...(userId && {
                OR: [
                    { owner_id: userId },
                    { owner_id: null },
                ],
            }),

            ...(query && {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { abbreviation: { contains: query, mode: "insensitive" } },
                    { plural: { contains: query, mode: "insensitive" } },
                ],
            }),
        },
    });
}

export async function getUnit(id: string) {
    try {
        const unit = await prisma.units.findUnique({
            where: { id },
        });

        if (!unit) {
            throw new NotFoundError("Unit not found");
        }

        return unit;
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function addUnit(
    name: string,
    plural: string,
    abbreviation: string,
    userId: string
) {
    try {
        return await prisma.units.create({
            data: {
                name,
                plural,
                abbreviation,
                users: {
                    connect: { id: userId },
                },
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function updateUnit(
    id: string,
    name: string,
    plural: string,
    abbreviation: string,
    userId: string
) {
    const unit = await prisma.units.findUnique({
        where: { id },
    });

    if (!unit) {
        throw new NotFoundError("Unit not found");
    }

    if (unit.owner_id !== userId) {
        throw new ForbiddenError("You are not allowed to edit this unit");
    }

    try {
        return await prisma.units.update({
            where: { id },
            data: { name, plural, abbreviation },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}

export async function deleteUnit(id: string, userId: string) {
    try {
        return await prisma.units.deleteMany({
            where: {
                id,
                owner_id: userId,
            },
        });
    } catch (error) {
        mapPrismaError(error);
    }
}