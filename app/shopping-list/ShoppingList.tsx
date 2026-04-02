import React from "react";
import ShoppingListCheckbox from "@/components/recipe/ShoppingListCheckbox";
import { getSortedItems } from "./getSortedItems";

import type { ShoppingItem, ShoppingListEntry } from "@/types/shoppingList";

export default function ShoppingList({ items }: { items: ShoppingItem[] }) {

    const sortedItems = getSortedItems(items);

    console.log(sortedItems);


    if (items.length === 0) {
        return (
            <p className="text-center text-gray-500 self-center">
                Your shopping list is empty.
            </p>
        );
    }

    return (
        <ul className="w-full">
            {sortedItems.map((entry) => {
                if (entry.type === "single") {
                    const item = entry.item;

                    return (
                        <li
                            key={item.id}
                            className="flex py-2 border-b last-of-type:border-b-0 border-gray-300 items-center gap-4"
                        >
                            <p>{Number(item.amount)}</p>
                            <p>{item.unit?.abbreviation ?? item.unit?.name ?? "-"}</p>
                            <p className="flex-1">{item.ingredient.name}</p>
                            <ShoppingListCheckbox
                                recipeIngredientId={item.id}
                                initialChecked={!!item.on_shopping_list}
                            />
                        </li>
                    );
                }

                return (
                    <li
                        key={`${entry.ingredientId}-${entry.unitFamily}`}
                        className="py-2 border-b last-of-type:border-b-0 border-gray-300"
                    >
                        <div className="flex items-center gap-4">
                            <p className="font-medium">{entry.totalAmount}</p>
                            <p>{entry.displayUnit}</p>
                            <p>{entry.ingredientName}</p>
                        </div>

                        <ul className="ml-6 mt-2 text-sm text-gray-500">
                            {entry.items.map((item) => (
                                <li key={item.id}>
                                    {item.amount} {item.unit?.abbreviation ?? item.unit?.name ?? "-"}{" "}
                                    {item.ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
}

