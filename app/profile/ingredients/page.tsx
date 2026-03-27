"use server"

import { removeIngredient } from "@/actions/ingredients";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getIngredients } from "@/lib/db/ingredients";

import type { Ingredient } from '@/types/ingredient';

import { ItemType } from "@/types/general"
import ListSection from '@/components/general/ListSection';
import PageHeadline from "@/components/typography/PageHeadline";
import GeneralSection from "@/components/containers/GeneralSection";


export default async function IngredientsPage() {
  const user = await getCurrentDbUser();

  const ingredients: Ingredient[] = await getIngredients(undefined, user?.id ?? undefined);

  const preparedIngredients = ingredients.map((item) => ({
    id: item.id,
    editHref: `/profile/ingredients/${item.id}/edit`,
    textItems: [item.name, item.plural || "–"],
  }));

  return (
    <GeneralSection>
      <PageHeadline>Ingredients</PageHeadline>
      {/* <IngredientList /> */}
      <ListSection items={preparedIngredients} removeItem={removeIngredient} type={ItemType.INGREDIENT} />
    </GeneralSection>
  );
}

