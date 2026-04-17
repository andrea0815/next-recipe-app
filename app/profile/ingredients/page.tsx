"use server"

import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getIngredients } from "@/lib/db/ingredients";

import type { Ingredient } from '@/types/ingredient';
import type { ListItem } from '@/types/general';

import IngredientSection from "./IngredientSection";

export default async function IngredientsPage() {
  const user = await getCurrentDbUser();

  if (!user) {
    throw new Error("You must be signed in.");
  }

  const ingredients: Ingredient[] = await getIngredients(undefined, user?.id);

  function prepareIngredient(item: Ingredient): ListItem {
    return {
      id: item.id,
      editHref: `/profile/ingredients/${item.id}/edit`,
      textItems: [
        { key: "name", value: item.name, isOwner: !!item.owner_id },
        { key: "plural", value: item.plural || "–" },
      ],
    };
  }

  const preparedIngredients: ListItem[] = [...ingredients]
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
    .map(prepareIngredient);

  return (
    <>
      <IngredientSection
        preparedIngredients={preparedIngredients}
      />
    </>
  );


}

