import { prisma } from "@/lib/prisma";

export async function ensureUser(params: {
  clerkUserId: string;
  email: string;
  name: string;
}) {
  const { clerkUserId, email, name } = params;

  // 1) already linked?
  const byClerkId = await prisma.users.findUnique({
    where: { clerk_user_id: clerkUserId },
  });
  if (byClerkId) return byClerkId;

  // 2) existing user by email? (link it)
  const byEmail = await prisma.users.findUnique({
    where: { email },
  });
  if (byEmail) {
    return prisma.users.update({
      where: { id: byEmail.id },
      data: { clerk_user_id: clerkUserId, name, updated_at: new Date() },
    });
  }

  // 3) otherwise create
  return prisma.users.create({
    data: { clerk_user_id: clerkUserId, email, name },
  });
}