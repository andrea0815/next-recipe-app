// "use server";

// import { updateUserById } from "@/lib/db/users";
// import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// import { ValidationError } from "@/lib/errors/app-errors";
// import { errorToActionResult } from "@/lib/errors/error-to-action-result";
// import { ActionResult } from "@/types/actions";

// export async function editUser(
//     prevState: ActionResult<UserFieldErrors>,
//     formData: FormData
// ): Promise<ActionResult<UserFieldErrors>> {
//     try {
//         const user = await getCurrentDbUser();



//         const fieldErrors: Partial<UserFieldErrors> = {};

//         await updateUserById(user.id);
//     } catch (error) {
//         return errorToActionResult<UserFieldErrors>(error);
//     }

//     redirect("/profile/users");
// }