"use client";

import React, { useMemo, useState } from "react";
import Checkbox from "@/components/form/Checkbox";
import Button from "@/components/buttons/Button";
import UnitDisplay from "@/components/unit/UnitDisplay";
import IngredientDisplay from "@/components/ingredient/InrgredientDisplay";
import { getSortedItems } from "./getSortedItems";
import { removeCheckedShoppingItems } from "@/actions/shoppingList";

import type { ShoppingListEntry, ShoppingItem } from "@/types/shoppingList";

export default function ShoppingList({ items }: { items: ShoppingItem[] }) {
  const sortedItems: ShoppingListEntry[] = getSortedItems(items);
  const [toBeRemovedKeys, setToBeRemovedKeys] = useState<Set<string>>(new Set());

  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 self-center">
        Your shopping list is empty.
      </p>
    );
  }

  const getEntryKey = (entry: ShoppingListEntry) => {
    if (entry.type === "single") {
      return `single-${entry.item.id}`;
    }

    return `group-${entry.ingredientId}-${entry.sharedUnit || "no-unit"}`;
  };

  const isMarked = (entry: ShoppingListEntry) => {
    return toBeRemovedKeys.has(getEntryKey(entry));
  };

  const handleCheckboxChange = (entry: ShoppingListEntry, checked: boolean) => {
    const key = getEntryKey(entry);

    setToBeRemovedKeys((prev) => {
      const next = new Set(prev);

      if (checked) {
        next.add(key);
      } else {
        next.delete(key);
      }

      return next;
    });
  };

  const selectedItemIds = useMemo(() => {
    const ids: string[] = [];

    for (const entry of sortedItems) {
      if (!isMarked(entry)) continue;

      if (entry.type === "single") {
        ids.push(entry.item.id);
      } else {
        ids.push(...entry.items.map((item) => item.id));
      }
    }

    return ids;
  }, [sortedItems, toBeRemovedKeys]);

  return (
    <form action={removeCheckedShoppingItems} className="w-full flex flex-col gap-4">
      {selectedItemIds.map((id) => (
        <input key={id} type="hidden" name="shoppingItemIds" value={id} />
      ))}

      <ul className="grid w-full grid-cols-[max-content_max-content_max-content_1fr] gap-x-4">
        {sortedItems.map((entry) => {
          const marked = isMarked(entry);
          const rowClass = marked ? "opacity-40" : "opacity-100";

          if (entry.type === "single") {
            const item = entry.item;

            return (
              <React.Fragment key={`single-${item.id}`}>
                <div className="w-10 flex justify-center py-2 items-center">
                  <Checkbox
                    checked={marked}
                    onChange={(nextChecked) => handleCheckboxChange(entry, nextChecked)}
                  />
                </div>

                <p className={`py-2 border-b border-gray-300 transition-opacity ${rowClass}`}>
                  {Number(entry.totalAmount)}
                </p>

                <p className={`py-2 border-b border-gray-300 transition-opacity ${rowClass}`}>
                  <UnitDisplay amount={Number(entry.totalAmount)} unit={item.unit} />
                </p>

                <p className={`py-2 border-b border-gray-300 flex-1 transition-opacity ${rowClass}`}>
                  <IngredientDisplay amount={entry.totalAmount} ingredient={item.ingredient} />
                </p>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={`group-${entry.ingredientId}-${entry.sharedUnit || "no-unit"}`}>
              <div className="w-10 flex justify-center py-2 items-center">
                <Checkbox
                  checked={marked}
                  onChange={(nextChecked) => handleCheckboxChange(entry, nextChecked)}
                />
              </div>

              <p className={`py-2 border-b border-gray-300 font-medium transition-opacity ${rowClass}`}>
                {entry.totalAmount}
              </p>

              <p className={`py-2 border-b border-gray-300 transition-opacity ${rowClass}`}>
                {entry.sharedUnit}
              </p>

              <p className={`py-2 border-b border-gray-300 flex-1 flex justify-between transition-opacity ${rowClass}`}>
                <span>{entry.ingredientName}</span>
                <span>^</span>
              </p>

              {entry.items.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="w-10" />
                  <p className={`py-2 border-b border-gray-300 text-sm text-gray-500 transition-opacity ${rowClass}`}>
                    {Number(item.amount)}
                  </p>
                  <p className={`py-2 border-b border-gray-300 text-sm text-gray-500 transition-opacity ${rowClass}`}>
                    <UnitDisplay amount={Number(item.amount)} unit={item.unit} />
                  </p>
                  <p className={`py-2 border-b border-gray-300 text-sm text-gray-500 flex-1 transition-opacity ${rowClass}`}>
                    <IngredientDisplay amount={item.amount} ingredient={item.ingredient} />
                  </p>
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        })}
      </ul>

      <Button
        priority="secondary"
        type="submit"
        disabled={selectedItemIds.length === 0}
      >
        Remove checked items
      </Button>
    </form>
  );
}