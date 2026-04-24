import { getCategories, getGlobalCategories } from "@/lib/db/categories";
import HeaderTabBarClient from "./HeaderTabBarClient";
import { RecipeListType } from "@/types/general";

export default async function HeaderTabBar({ type, userId }: { type: RecipeListType; userId?: string }) {

    const categories = type === RecipeListType.COLLECTION ?
        await getCategories(undefined, userId) :
        await getGlobalCategories(undefined);

    return <HeaderTabBarClient categories={categories} type={type} />;
}