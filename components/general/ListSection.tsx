"use client";

import { startTransition, useOptimistic, useState } from "react";
import ListItem from "../general/ListItem";
import ListAddButton from "./ListAddButton";
import ErrorDialog from "../errors/ErrorDialog";
import type { ActionResult } from "@/types/actions";
import type { ItemType } from "@/types/general"

type PreparedItem = {
    id: string;
    textItems: string[];
    editHref: string;
};

type ListSectionProps = {
    type: ItemType;
    items: PreparedItem[];
    removeItem: (id: string) => Promise<ActionResult>;
};

export default function ListSection({ type, items, removeItem }: ListSectionProps) {
    const [errorMessage, setErrorMessage] = useState("");

    const [optimisticItems, setOptimisticItems] = useOptimistic(
        items,
        (currentItems, itemId: string) => {
            return currentItems.filter((item) => item.id !== itemId);
        }
    );

    const removeItemById = async (itemId: string) => {
        const result = await removeItem(itemId);

        if (!result.success) {
            setErrorMessage(result.message);
            return;
        }

        startTransition(() => {
            setOptimisticItems(itemId);
        });
    };

    return (
        <>
            <ErrorDialog
                open={!!errorMessage}
                message={errorMessage}
                onClose={() => setErrorMessage("")}
            />

            <section className="my-6">
                <ul className="flex flex-col">
                    <li className="flex justify-start mb-2">
                        <ListAddButton type={type} />
                    </li>
                    {optimisticItems.map((item, index) => (
                        <ListItem
                            key={item.id}
                            id={item.id}
                            editHref={item.editHref}
                            onDeleteAction={removeItemById.bind(null, item.id)}
                            textItems={item.textItems}
                        />
                    ))}
                </ul>
            </section>
        </>
    );
}