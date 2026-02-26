import React from 'react';
import { getRecipes } from "@/lib/db/recipes";
import RecipeItems from './RecipeItems';

type Recipe = {
  id: string;
  name: string;
  subtitle: string;
  image_uri: string | null;
}

export default async function RecipeList() {

  const recipes: Recipe[] = await getRecipes();

  return (
    <RecipeItems recipes={recipes}></RecipeItems>
  );
}
