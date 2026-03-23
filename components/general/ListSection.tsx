"use client";

import { useOptimistic } from "react";

import type { Ingredient } from "@/types/ingredient";
import type { Unit } from "@/types/unit";
import type { Category } from "@/types/category";

import ListItem from "../general/ListItem";

type ListSectionProps = {
    items: Ingredient[] | Unit[] | Category[],
    removeItem: (id: string) => void
}

export default function ListSection({ items, removeItem }: ListSectionProps) {

    const [optimisticItems, setOptimisticItems] = useOptimistic(
        items,
        (currentItems, itemId) => {
            return currentItems.filter(item => item.id !== itemId);
        }
    );

    const removeItemById = async (recipeId: string) => {
        setOptimisticItems(recipeId);
        await removeItem(recipeId);
    }

    return (
        <section>
            <ul className="">
                {optimisticItems.map((item) => (
                    <>
                        <ListItem
                            key={item.id}
                            id={item.id}
                            editHref={`/items/${item.id}/edit`}
                            onDeleteAction={removeItemById.bind(null, item.id)}
                            textItems={[item.name, item.plural || "–"]}
                        />

                    </>
                ))}
            </ul>
        </section>
    );
}
