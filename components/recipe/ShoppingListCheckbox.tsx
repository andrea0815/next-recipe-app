"use client";

import { useState, useTransition } from "react";
import Checkbox from "@/components/form/Checkbox";
import { editShoppingListStatus } from "@/actions/recipes";

type Props = {
  recipeIngredientId: string;
  initialChecked: boolean;
};

export default function ShoppingListCheckbox({
  recipeIngredientId,
  initialChecked,
}: Props) {
  const [checked, setChecked] = useState(initialChecked);
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextChecked: boolean) => {
    const previous = checked;
    setChecked(nextChecked);

    startTransition(async () => {
      try {
        await editShoppingListStatus(recipeIngredientId, nextChecked);
      } catch {
        setChecked(previous);
      }
    });
  };

  return (
    <Checkbox checked={checked} onChange={handleChange}>
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