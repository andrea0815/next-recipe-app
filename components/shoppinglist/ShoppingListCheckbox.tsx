"use client";

import { useState, useTransition } from "react";
import Checkbox from "@/components/form/Checkbox";
import { createShoppingItem, removeShoppingItem } from "@/actions/shoppingList";

type Props = {
  recipeIngredientId: string;
  recipePortions: number;
  recipeId: string;
  initialOnList: boolean;
  inverseDisplay?: boolean;
};

export default function ShoppingListCheckbox({
  recipeIngredientId,
  recipeId,
  recipePortions,
  initialOnList,
  inverseDisplay = false,
}: Props) {
  const [isOnList, setIsOnList] = useState(initialOnList);
  const [isPending, startTransition] = useTransition();

  const displayedChecked = inverseDisplay ? !isOnList : isOnList;

  const handleChange = (nextDisplayedChecked: boolean) => {
    const previousIsOnList = isOnList;

    const nextIsOnList = inverseDisplay
      ? !nextDisplayedChecked
      : nextDisplayedChecked;

    setIsOnList(nextIsOnList);

    startTransition(async () => {
      try {
        if (nextIsOnList) {
          await createShoppingItem(
            recipePortions,
            recipeId,
            recipeIngredientId,
          );
        } else {
          await removeShoppingItem(recipeIngredientId);
        }
      } catch {
        setIsOnList(previousIsOnList);
      }
    });
  };

  return (
    <Checkbox
      checked={displayedChecked}
      onChange={handleChange}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="h-4 w-4"
      >
        <path
          d="M5 13l4 4L19 7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Checkbox>
  );
}