import React from "react";
import ShoppingListCheckbox from "@/components/recipe/ShoppingListCheckbox";
import { getSortedItems } from "./getSortedItems";

import type { ShoppingItem, ShoppingListEntry } from "@/types/shoppingList";
import ShoppingListGroupCheckbox from "@/components/recipe/ShoppingListGroupCheckbox";

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
        <ul className="grid w-full grid-cols-[max-content_max-content_max-content_1fr] gap-x-4">
            {sortedItems.map((entry, index) => {
                if (entry.type === "single") {
                    const item = entry.item;

                    return (
                        <React.Fragment
                            key={`${entry.item.ingredient.id}-${entry.item.unit?.id ?? "no-unit"}-${index}`}
                        >
                            <div className="w-10 flex justify-center py-2 items-center">

                                <ShoppingListCheckbox
                                    recipeIngredientId={item.id}
                                    initialChecked={!!item.on_shopping_list}
                                    inverseDisplay={true}
                                />
                            </div>
                            <p className="py-2 border-b border-gray-300 items-center">{Number(item.amount)}</p>
                            <p className="py-2 border-b border-gray-300 items-center">{item.unit?.abbreviation ?? item.unit?.name ?? "-"}</p>
                            <p className="py-2 border-b border-gray-300 items-center flex-1">{item.ingredient.name}</p>
                        </React.Fragment>
                    );
                }

                return (
                    <React.Fragment
                        key={`${entry.ingredientId}-${entry.displayUnit}`}
                    >
                        <div className="w-10 flex justify-center py-2 items-center">
                            <ShoppingListGroupCheckbox
                                recipeIngredientIds={entry.items.map((item) => item.id)}
                                initialChecked={entry.items.every((item) => item.on_shopping_list)}
                                inverseDisplay={true}
                            />
                        </div>
                        <p className=" py-2 border-b border-gray-300 items-centerfont-medium">{entry.totalAmount}</p>
                        <p className="py-2 border-b border-gray-300 items-center">{entry.displayUnit}</p>
                        <p className="py-2 border-b border-gray-300 items-center flex-1 flex justify-between"><span>{entry.ingredientName}</span> <span>^</span></p>

                        {entry.items.map((item, index) => (
                            <React.Fragment
                                key={`${entry.ingredientId}-${entry.displayUnit}-${index}`}
                            >
                                <div className="w-10 flex justify-center">
                                </div>
                                <p className="py-2 border-b border-gray-300 items-center text-sm text-gray-500">{Number(item.amount)}</p>
                                <p className="py-2 border-b border-gray-300 items-center text-sm text-gray-500">{item.unit?.abbreviation ?? item.unit?.name ?? "-"}</p>
                                <p className="py-2 border-b border-gray-300 items-center text-sm text-gray-500 flex-1">{item.ingredient.name}</p>
                            </React.Fragment>
                        ))}

                    </React.Fragment>
                );
            })}
        </ul>
    );
}

