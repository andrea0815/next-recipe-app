// lib/db/cachedCategories.ts
import { unstable_cache } from "next/cache";
import { getCategories, getGlobalCategories } from "@/lib/db/categories";

export function getCachedCategories(userId?: string) {
    return unstable_cache(
        async () => {
            return getCategories(undefined, userId);
        },
        ["categories", userId ?? "global"],
        {
            revalidate: 60 * 60, // 1 hour
            tags: [`categories-${userId ?? "global"}`],
        }
    )();
}

export const getCachedGlobalCategories = unstable_cache(
    async () => {
        return getGlobalCategories(undefined);
    },
    ["global-categories"],
    {
        revalidate: 60 * 60,
        tags: ["global-categories"],
    }
);