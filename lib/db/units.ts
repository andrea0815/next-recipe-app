import { prisma } from "@/lib/prisma";

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
                        ],
                    }
                    : {},
            ],
        },
    });
}

export async function getUnit(id: string) {
    return prisma.units.findUnique({
        where: { id },
    });
}

export async function addUnit(
    name: string,
    abbreviation: string,
    userId: string
) {
    return prisma.units.create({
        data: {
            name,
            abbreviation,
            users: {
                connect: { id: userId },
            },
        },
    });
}

export async function updateUnit(
    id: string,
    name: string,
    abbreviation: string,
    userId: string
) {
    return prisma.units.update({
        where: {
            id,
            owner_id: userId,
        },
        data: { name, abbreviation },
    });
}

export async function deleteUnit(id: string, userId: string) {
    return prisma.units.deleteMany({
        where: {
            id,
            owner_id: userId,
        },
    });
}
