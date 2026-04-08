"use server"

import { removeIngredient } from "@/actions/ingredients";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getIngredients } from "@/lib/db/ingredients";

import type { Ingredient, IngredientDraft, IngredientListItem, CreatedIngredient } from '@/types/ingredient';
import type { RecipeDraft } from '@/types/recipe';
import type { AddIngredientPanelRef } from '@/components/ingredient/AddIngredientPanel';
import { FormMode } from '@/types/general';

import { ItemType } from "@/types/general"
import ListSection from '@/components/general/ListSection';
import PageHeadline from "@/components/typography/PageHeadline";
import GeneralSection from "@/components/containers/GeneralSection";
import AddIngredientPanel from "@/components/ingredient/AddIngredientPanel";
import Button from "@/components/buttons/Button";
import IngredientSection from "./IngredientSection";

export default async function IngredientsPage() {
  const user = await getCurrentDbUser();

  const ingredients: Ingredient[] = await getIngredients(undefined, user?.id ?? undefined);

  function prepareIngredient(item: CreatedIngredient): IngredientListItem {
    return {
      id: item.id,
      editHref: `/profile/ingredients/${item.id}/edit`,
      textItems: [item.name, item.plural || "–"],
    };
  }

  const preparedIngredients = ingredients.map(prepareIngredient);

  return (
    <>
      <IngredientSection
        preparedIngredients={preparedIngredients}
      />
    </>
  );


}

