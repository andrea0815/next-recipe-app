"use client";

import { useState, useTransition } from "react";
import Checkbox from "@/components/form/Checkbox";
import { editShoppingListStatus } from "@/actions/shoppingList";

type Props = {
  recipeIngredientIds: string[];
  initialChecked: boolean;
  inverseDisplay?: boolean;
};

export default function ShoppingListGroupCheckbox({
  recipeIngredientIds,
  initialChecked,
  inverseDisplay = false,
}: Props) {
  const [checked, setChecked] = useState(initialChecked);
  const [isPending, startTransition] = useTransition();

  const displayedChecked = inverseDisplay ? !checked : checked;

  const handleChange = (nextDisplayedChecked: boolean) => {
    const nextRealChecked = inverseDisplay
      ? !nextDisplayedChecked
      : nextDisplayedChecked;

    const previous = checked;
    setChecked(nextRealChecked);

    startTransition(async () => {
      try {
        await Promise.all(
          recipeIngredientIds.map((id) =>
            editShoppingListStatus(id, nextRealChecked)
          )
        );
      } catch {
        setChecked(previous);
      }
    });
  };

  return (
    <Checkbox checked={displayedChecked} onChange={handleChange}>
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