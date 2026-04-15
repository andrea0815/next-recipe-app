"use server";

import { updateUserById } from "@/lib/db/users";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { revalidatePath } from "next/cache";

export async function editUserPreference(
    recipe_public_by_default: boolean
): Promise<void> {
    const user = await getCurrentDbUser();

    if (!user) {
        throw new Error("You must be signed in.");
    }

    await updateUserById(user.id, {
        recipe_public_by_default,
    });

    revalidatePath("/profile/users");
}