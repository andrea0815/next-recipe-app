import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserIdByClerkId(clerkUserId: string) {
    const user = await prisma.users.findUnique({
        where: { clerk_user_id: clerkUserId },
        select: { id: true },
    });

    return user?.id ?? null;
}