import React from 'react';
import { getRecipes } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import RecipeItems from './RecipeItems';

type Recipe = {
  id: string;
  name: string;
  subtitle: string;
  image_uri: string | null;
}

export default async function RecipeList() {

  const user = await getCurrentDbUser();

  const recipes: Recipe[] = await getRecipes(undefined, user?.id ?? undefined);

  return (
    <RecipeItems recipes={recipes}></RecipeItems>
  );
}
