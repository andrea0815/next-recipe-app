import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export const runtime = "nodejs"; // important for Prisma

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req); // uses CLERK_WEBHOOK_SIGNING_SECRET by default

        if (evt.type === "user.created" || evt.type === "user.updated") {
            const clerkUserId = evt.data.id;

            const primaryEmail =
                evt.data.email_addresses?.find(
                    (e) => e.id === evt.data.primary_email_address_id
                )?.email_address ?? evt.data.email_addresses?.[0]?.email_address ?? "";

            const name =
                [evt.data.first_name, evt.data.last_name].filter(Boolean).join(" ") ||
                evt.data.username ||
                primaryEmail;

            await prisma.users.upsert({
                where: { clerk_user_id: clerkUserId },
                update: {
                    email: primaryEmail,
                    name,
                    updated_at: new Date(),
                },
                create: {
                    clerk_user_id: clerkUserId,
                    email: primaryEmail,
                    name,
                },
            });
        }

        // optional: handle deletes
        if (evt.type === "user.deleted") {
            await prisma.users.deleteMany({
                where: { clerk_user_id: evt.data.id },
            });
        }

        return new Response("ok", { status: 200 });
    } catch (err) {
        console.error("Webhook error:", err);
        return new Response("Webhook verification failed", { status: 400 });
    }
}