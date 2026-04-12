"use client";

import { useState, useRef } from "react";
import { removeIngredient } from "@/actions/ingredients";

import type { AddIngredientPanelRef } from "@/components/ingredient/AddIngredientPanel";
import type { Ingredient } from "@/types/ingredient";
import type { ListItem } from "@/types/general";
import { FormMode, ItemType } from "@/types/general";

import ListSection from "@/components/general/ListSection";
import PageHeadline from "@/components/typography/PageHeadline";
import IngredientPanel from "@/components/ingredient/IngredientPanel";
import ListAddButton from "@/components/general/ListAddButton";

export default function IngredientSection({
  preparedIngredients,
}: {
  preparedIngredients: ListItem[];
}) {
  const [displayed, setDisplayed] = useState<ListItem[]>(preparedIngredients);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [panelFormMode, setpanelFormMode] = useState<FormMode>(FormMode.CREATE);
  const addIngredientPanelRef = useRef<AddIngredientPanelRef>(null);

  function prepareIngredient(item: Ingredient): ListItem {
    return {
      id: item.id,
      editHref: `/profile/ingredients/${item.id}/edit`,
      textItems: [
        { key: "name", value: item.name },
        { key: "plural", value: item.plural || "–" },
      ],
    };
  }

  return (
    <div className="w-full max-w-200 flex flex-col gap-4">
      <PageHeadline>Ingredients</PageHeadline>

      <ListAddButton
        type={ItemType.INGREDIENT}
        onPress={() => {
          setpanelFormMode(FormMode.CREATE);
          setSelectedIngredient(null);
          addIngredientPanelRef.current?.open();
        }}
      />

      <ListSection
        items={displayed}
        removeItem={removeIngredient}
        type={ItemType.INGREDIENT}
        onEditButton={(item) => {
          setpanelFormMode(FormMode.EDIT);

          setSelectedIngredient({
            id: item.id,
            name: item.textItems.find((t) => t.key === "name")?.value || "",
            plural: item.textItems.find((t) => t.key === "plural")?.value || "",
          });

          addIngredientPanelRef.current?.open();
        }}
      />

      <IngredientPanel
        ref={addIngredientPanelRef}
        mode={panelFormMode}
        type={ItemType.INGREDIENT}
        initialDraft={{
          id: selectedIngredient?.id || "",
          name: selectedIngredient?.name || "",
          plural: selectedIngredient?.plural || "",
        }}
        onCreated={(ingredient) => {
          setDisplayed((prev) => [...prev, prepareIngredient(ingredient)]);
          setSelectedIngredient(ingredient);
        }}
      />
    </div>
  );
}