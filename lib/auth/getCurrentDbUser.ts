// import { cache } from "react";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import {
//   getUserByClerkId,
//   getUserByEmail,
//   createUser,
//   updateUserByEmail,
// } from "@/lib/db/users";

// export const getCurrentDbUser = cache(async () => {
//   const { userId: clerkId } = await auth();
//   if (!clerkId) return null;

//   const existing = await getUserByClerkId(clerkId);
//   if (existing) return existing;

//   const clerkUser = await currentUser();
//   if (!clerkUser) return null;

//   const primaryEmail =
//     clerkUser.emailAddresses.find(
//       (e) => e.id === clerkUser.primaryEmailAddressId
//     )?.emailAddress ??
//     clerkUser.emailAddresses[0]?.emailAddress ??
//     null;

//   const name =
//     [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
//     clerkUser.username ||
//     primaryEmail ||
//     "Unknown user";

//   if (primaryEmail) {
//     const existingByEmail = await getUserByEmail(primaryEmail);

//     if (existingByEmail) {
//       return await updateUserByEmail(primaryEmail, {
//         clerk_user_id: clerkId,
//         name,
//       });
//     }
//   }

//   return await createUser({
//     clerk_user_id: clerkId,
//     email: primaryEmail ?? `${clerkId}@missing.local`,
//     name,
//   });
// });

import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/db/users";

export const getCurrentDbUser = cache(async () => {
  const { userId: clerkId } = await auth();

  console.log("clerkId:", clerkId);

  if (!clerkId) return null;

  const dbUser = await getUserByClerkId(clerkId);

  console.log("dbUser found:", !!dbUser);
  console.log(dbUser);

  return dbUser;
});