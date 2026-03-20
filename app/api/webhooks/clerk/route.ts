import { NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import {
    createOrLinkUserByEmail,
    deleteUserByClerkId,
    getUserByClerkId,
} from "@/lib/db/users";
import { seedDefaultsForUser } from "@/lib/data/seedDefaultsForUser";

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req);
        console.log("Webhook verified:", evt.type);

        if (evt.type === "user.created" || evt.type === "user.updated") {
            const clerkUserId = evt.data.id;

            const primaryEmail =
                evt.data.email_addresses?.find(
                    (e) => e.id === evt.data.primary_email_address_id
                )?.email_address ??
                evt.data.email_addresses?.[0]?.email_address ??
                null;

            const name =
                [evt.data.first_name, evt.data.last_name].filter(Boolean).join(" ") ||
                evt.data.username ||
                primaryEmail ||
                "Unknown user";

            const existingUser = await getUserByClerkId(clerkUserId);

            const user = await createOrLinkUserByEmail({
                clerk_user_id: clerkUserId,
                email: primaryEmail,
                name,
            });

            // defaults only when this is really a newly created DB user
            if (!existingUser && evt.type === "user.created") {
                await seedDefaultsForUser(user.id);
            }

            return new Response("ok", { status: 200 });
        }

        if (evt.type === "user.deleted") {
            const clerkUserId = evt.data.id;

            if (!clerkUserId) {
                return new Response("Missing clerk user id", { status: 400 });
            }

            const existingUser = await getUserByClerkId(clerkUserId);

            if (!existingUser) {
                return new Response("ok", { status: 200 });
            }

            await deleteUserByClerkId(clerkUserId);

            return new Response("ok", { status: 200 });
        }

        return new Response("ok", { status: 200 });
    } catch (error) {
        console.error("Clerk webhook error:", error);
        return new Response("Webhook error", { status: 500 });
    }
}