import React from 'react';
import { getIngredients } from "@/lib/db/ingredients";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import IngredientItems from './Ingredienttems';
import type { Ingredient } from '@/types/ingredient';

export default async function RecipeList() {

  const user = await getCurrentDbUser();

  const ingredients: Ingredient[] = await getIngredients(undefined, user?.id ?? undefined);

  return (
    <IngredientItems ingredients={ingredients}></IngredientItems>
  );
}
