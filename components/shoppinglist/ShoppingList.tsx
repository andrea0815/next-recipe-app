"use client";

import React, { useMemo, useState } from "react";
import Checkbox from "@/components/form/Checkbox";
import Button from "@/components/buttons/Button";
import UnitDisplay from "@/components/unit/UnitDisplay";
import IngredientDisplay from "@/components/ingredient/InrgredientDisplay";
import { getSortedItems } from "./getSortedItems";
import { removeCheckedShoppingItems } from "@/actions/shoppingList";
import { useActionState } from "react";

import type { ShoppingListEntry, ShoppingItem, ShoppingItemFields } from "@/types/shoppingList";
import IconCheck from "@/components/icons/IconCheck";
import IconArrowDown from "@/components/icons/IconArrowDown";
import IconArrowUp from "@/components/icons/IconArrowUp";
import IconSpinner from "../icons/IconSpinner";
import { ActionResult } from "@/types/actions";

export default function ShoppingList({ items }: { items: ShoppingItem[] }) {
    const sortedItems: ShoppingListEntry[] = getSortedItems(items);
    const [toBeRemovedKeys, setToBeRemovedKeys] = useState<Set<string>>(new Set());

    const initialState: ActionResult<ShoppingItemFields, undefined> = {
        success: false,
        message: "",
    };
    const [state, formAction, pending] = useActionState(
        removeCheckedShoppingItems,
        initialState
    );

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

    const allEntryKeys = useMemo(() => {
        return sortedItems.map(getEntryKey);
    }, [sortedItems]);

    const allMarked = allEntryKeys.length > 0 && allEntryKeys.every((key) => toBeRemovedKeys.has(key));

    const handleToggleMarkAll = () => {
        setToBeRemovedKeys(() => {
            if (allMarked) {
                return new Set();
            }

            return new Set(allEntryKeys);
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


    // Group Dropdown

    const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

    const isGroupOpen = (entry: ShoppingListEntry) => {
        return openGroups.has(getEntryKey(entry));
    };

    const toggleGroup = (entry: ShoppingListEntry) => {
        const key = getEntryKey(entry);

        setOpenGroups((prev) => {
            const next = new Set(prev);

            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }

            return next;
        });
    };

    return (
        <form action={formAction} className="w-full flex flex-col gap-4 flex-1">
            {selectedItemIds.map((id) => (
                <input key={id} type="hidden" name="shoppingItemIds" value={id} />
            ))}

            <div className="flex gap-2 justify-between">
                <Button
                    priority="tertiary"
                    type="button"
                    onClick={handleToggleMarkAll}
                    customClass="py-0 px-0"
                >
                    {allMarked ? "Unmark all" : "Mark all"}
                </Button>

                <Button
                    priority="secondary"
                    type="submit"
                    disabled={selectedItemIds.length === 0}
                >
                    {pending && <IconSpinner />}
                    {pending ? "Removing..." : "Remove items"}
                </Button>
            </div>

            {items.length === 0 ?

                <p className="text-center flex-1 text-gray-500 flex justify-center items-center">
                    Your shopping list is empty.
                </p>

                :

                <ul className="grid w-full grid-cols-[max-content_max-content_max-content_1fr] sm:gap-x-4 gap-x-2">
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
                                        >
                                            <IconCheck />
                                        </Checkbox>
                                    </div>

                                    <p className={`py-2 border-b border-gray-300 transition-opacity ${rowClass}`}>
                                        {Number(entry.totalAmount)}
                                    </p>

                                    <p className={`py-2 border-b border-gray-300 transition-opacity ${rowClass}`}>
                                        <UnitDisplay amount={Number(entry.totalAmount)} unit={item.unit} />
                                    </p>

                                    <p className={`py-2 border-b border-gray-300 flex-1 transition-opacity ${rowClass}`}>
                                        <IngredientDisplay amount={entry.totalAmount} ingredient={entry.item.ingredient} />
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
                                    >
                                        <IconCheck />
                                    </Checkbox>
                                </div>

                                <p className={`py-2 border-b border-gray-300 font-medium transition-opacity ${rowClass}`}>
                                    {entry.totalAmount}
                                </p>

                                <p className={`py-2 border-b border-gray-300 transition-opacity ${rowClass}`}>
                                    {entry.sharedUnit}
                                </p>

                                {entry.items[0] && (
                                    <button
                                        type="button"
                                        onClick={() => toggleGroup(entry)}
                                        className={`py-2 border-b border-gray-300 flex-1 flex justify-between items-center text-left transition-opacity cursor-pointer ${rowClass}`}
                                    >
                                        <IngredientDisplay
                                            amount={entry.totalAmount}
                                            ingredient={entry.items[0].ingredient}
                                        />
                                        {isGroupOpen(entry) ? <IconArrowUp /> : <IconArrowDown />}
                                    </button>
                                )}

                                {isGroupOpen(entry) &&
                                    entry.items.map((item) => (
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
            }


        </form>
    );
}