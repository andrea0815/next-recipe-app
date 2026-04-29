// lib/db/cachedCategories.ts
import { unstable_cache } from "next/cache";
import { getCategories, getGlobalCategories } from "@/lib/db/categories";

const getCachedCategoriesInternal = unstable_cache(
    async (userId?: string) => {
        return getCategories(undefined, userId);
    },
    ["categories"],
    {
        revalidate: 60 * 60,
        tags: ["categories"],
    }
);

export async function getCachedCategories(userId?: string) {
    return getCachedCategoriesInternal(userId);
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