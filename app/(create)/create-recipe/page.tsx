import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getCategories } from "@/lib/db/categories";
import { getUnits } from "@/lib/db/units";
import { getIngredients } from "@/lib/db/ingredients";

import type { Category } from '@/types/category';
import type { Ingredient } from "@/types/ingredient";
import type { Unit } from "@/types/unit";

import RecipeForm from './RecipeForm';

export default async function AddRecipePage() {

  const user = await getCurrentDbUser();

  const categories: Category[] = await getCategories(undefined, user?.id ?? undefined);
  const ingredients: Ingredient[] = await getIngredients(undefined, user?.id ?? undefined);
  const units: Unit[] = await getUnits(undefined, user?.id ?? undefined);

  return (
    <RecipeForm categories={categories} ingredients={ingredients} units={units}></RecipeForm>
  );
}

