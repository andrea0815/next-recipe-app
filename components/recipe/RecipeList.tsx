import React from 'react';
import { getUserRecipes } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import RecipeItems from './RecipeItems';
import type { RecipeListItem } from '@/types/recipe';

export default async function RecipeList() {

  const user = await getCurrentDbUser();

  const recipes: RecipeListItem[] = await getUserRecipes(undefined, user?.id ?? undefined);
  console.log(recipes);


  return (
    <RecipeItems recipes={recipes}></RecipeItems>
  );
}
