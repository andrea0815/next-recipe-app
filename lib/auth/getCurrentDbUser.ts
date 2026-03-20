import { auth, currentUser } from "@clerk/nextjs/server";
import {
  getUserByClerkId,
  getUserByEmail,
  createUser,
  updateUserByEmail,
} from "@/lib/db/users";

export async function getCurrentDbUser() {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Not authenticated");
  }

  // 1. Try find by clerk id
  let dbUser = await getUserByClerkId(clerkId);

  if (dbUser) return dbUser;

  // 2. Fetch Clerk user only if missing in DB
  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error("Clerk user not found");
  }

  const primaryEmail =
    clerkUser.emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    null;

  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
    clerkUser.username ||
    primaryEmail ||
    "Unknown user";

  // 3. Try match by email and link clerk id
  if (primaryEmail) {
    const existingByEmail = await getUserByEmail(primaryEmail);

    if (existingByEmail) {
      dbUser = await updateUserByEmail(primaryEmail, {
        clerk_user_id: clerkId,
        name,
      });

      return dbUser;
    }
  }

  // 4. Create new user
  dbUser = await createUser({
    clerk_user_id: clerkId,
    email: primaryEmail ?? `${clerkId}@missing.local`,
    name,
  });

  return dbUser;
}