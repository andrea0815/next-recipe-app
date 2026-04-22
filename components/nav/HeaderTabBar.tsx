import { getCategoriesByUserId } from "@/lib/db/categories";
import HeaderTabBarClient from "./HeaderTabBarClient";
import { RecipeListType } from "@/types/general";

export default async function HeaderTabBar({ type, userId }: { type: RecipeListType; userId?: string }) {

  const categories = await getCategoriesByUserId(undefined, userId);

  return <HeaderTabBarClient categories={categories} type={type} />;
}