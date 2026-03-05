import React from 'react';
import { getUserRecipes } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import RecipeItems from './RecipeItems';
import type { Recipe } from '@/types/recipe';

export default async function RecipeList() {

  const user = await getCurrentDbUser();

  const recipes: Recipe[] = await getUserRecipes(undefined, user?.id ?? undefined);

  return (
    <RecipeItems recipes={recipes}></RecipeItems>
  );
}
