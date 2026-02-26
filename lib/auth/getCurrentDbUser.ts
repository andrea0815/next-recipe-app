import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentDbUser() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Not authenticated");
  }

  const dbUser = await prisma.users.findUnique({
    where: { clerk_user_id: clerkId },
  });

  if (!dbUser) {
    throw new Error("User not found in database");
  }

  return dbUser;
}