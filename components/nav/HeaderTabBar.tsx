import {
    getCachedCategories,
    getCachedGlobalCategories,
} from "@/lib/db/cachedCategories";

import HeaderTabBarClient from "./HeaderTabBarClient";
import { RecipeListType } from "@/types/general";

export default async function HeaderTabBar({
    type,
    userId,
}: {
    type: RecipeListType;
    userId?: string | null;
}) {
    const categories =
        type === RecipeListType.COLLECTION && userId
            ? await getCachedCategories(userId)
            : await getCachedGlobalCategories();

    return <HeaderTabBarClient categories={categories} type={type} />;
}