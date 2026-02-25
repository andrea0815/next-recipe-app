import { prisma } from "@/lib/prisma";

export async function ensureUser(params: {
  clerkUserId: string;
  email: string;
  name: string;
}) {
  const { clerkUserId, email, name } = params;

  const existing = await prisma.users.findUnique({
    where: { clerk_user_id: clerkUserId },
  });

  if (existing) return existing;

  return prisma.users.create({
    data: { clerk_user_id: clerkUserId, email, name },
  });
}