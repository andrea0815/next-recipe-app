"use server";

import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createRecipe(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("No Clerk user");

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = clerkUser.fullName ?? "User";

  // ensure row in your users table
  const dbUser = await prisma.users.upsert({
    where: { clerk_user_id: userId },
    update: { email, name },
    create: { clerk_user_id: userId, email, name },
  });

  const recipe = await prisma.recipes.create({
    data: {
      name: String(formData.get("name") ?? ""),
      subtitle: String(formData.get("subtitle") ?? ""),
      owner_id: dbUser.id,
      is_public: false,
    },
  });

  revalidatePath("/recipes");
  return recipe;
}

export async function deleteRecipe(recipeId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");

  // only delete if it belongs to the current user
  const dbUser = await prisma.users.findUnique({
    where: { clerk_user_id: userId },
    select: { id: true },
  });
  if (!dbUser) throw new Error("User not found");

  await prisma.recipes.deleteMany({
    where: { id: recipeId, owner_id: dbUser.id },
  });

  revalidatePath("/recipes");
}