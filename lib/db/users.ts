import { prisma } from "@/lib/prisma";
import type { CreateUserInput, UpdateUserInput } from "@/types/user"

export async function getUserById(id: string) {
  return prisma.users.findUnique({
    where: { id },
  });
}

export async function getUserByClerkId(clerkUserId: string) {
  return prisma.users.findUnique({
    where: { clerk_user_id: clerkUserId },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: { email },
  });
}

export async function getUserIdByClerkId(clerkUserId: string) {
  const user = await prisma.users.findUnique({
    where: { clerk_user_id: clerkUserId },
    select: { id: true },
  });

  return user?.id ?? null;
}

export async function createUser(data: CreateUserInput) {
  return prisma.users.create({
    data: {
      clerk_user_id: data.clerk_user_id,
      email: data.email,
      name: data.name,
      username: data.username ?? null,
    },
  });
}

export async function updateUserById(id: string, data: UpdateUserInput) {
  return prisma.users.update({
    where: { id },
    data: {
      ...data,
      updated_at: new Date(),
    },
  });
}

export async function updateUserByClerkId(
  clerkUserId: string,
  data: UpdateUserInput
) {
  return prisma.users.update({
    where: { clerk_user_id: clerkUserId },
    data: {
      ...data,
      updated_at: new Date(),
    },
  });
}

export async function updateUserByEmail(email: string, data: UpdateUserInput) {
  return prisma.users.update({
    where: { email },
    data: {
      ...data,
      updated_at: new Date(),
    },
  });
}

export async function deleteUserById(id: string) {
  return prisma.users.delete({
    where: { id },
  });
}

export async function deleteUserByClerkId(clerkUserId: string) {
  return prisma.users.delete({
    where: { clerk_user_id: clerkUserId },
  });
}

export async function createOrLinkUserByEmail(params: {
  clerk_user_id: string;
  email: string | null;
  username: string | null;
  name: string;
}) {
  const { clerk_user_id, email, username, name } = params;

  const existingByClerkId = await getUserByClerkId(clerk_user_id);

  if (existingByClerkId) {
    return updateUserByClerkId(clerk_user_id, {
      email: email ?? existingByClerkId.email,
      name,
      username
    });
  }

  if (email) {
    const existingByEmail = await getUserByEmail(email);

    if (existingByEmail) {
      return updateUserByEmail(email, {
        clerk_user_id,
        name,
        username,
      });
    }
  }

  return createUser({
    clerk_user_id,
    email: email ?? `${clerk_user_id}@missing.local`,
    name,
    username,
  });
}