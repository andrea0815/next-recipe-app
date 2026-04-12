"use client";

import React, { startTransition, useOptimistic, useState } from "react";
import ErrorDialog from "../errors/ErrorDialog";
import type { ActionResult } from "@/types/actions";
import type { ItemType, ListItem as ListItemType, TextItem } from "@/types/general"
import SectionWrapper from "../containers/SectionWrapper";
import ListItem from "../general/ListItem";
import { Ingredient } from "@/types/ingredient";

type ListSectionProps = {
    type: ItemType;
    items: ListItemType[];
    removeItem: (id: string) => Promise<ActionResult>;
    onEditButton: (item: ListItemType) => void;
};

export default function ListSection({ type, items, removeItem, onEditButton }: ListSectionProps) {
    const [errorMessage, setErrorMessage] = useState("");

    const [optimisticItems, setOptimisticItems] = useOptimistic(
        items,
        (currentItems, itemId: string) => {
            return currentItems.filter((item) => item.id !== itemId);
        }
    );

    const [query, setQuery] = useState("");

    const filteredItems: ListItemType[] = optimisticItems.filter((item) =>
        item.textItems.some((text) =>
            text.value.toLowerCase().includes(query.toLowerCase())
        )
    );

    const removeItemById = async (itemId: string) => {
        const result = await removeItem(itemId);

        if (!result.success) {
            setErrorMessage(result.message ?? "Something went wrong.");
            return;
        }

        startTransition(() => {
            setOptimisticItems(itemId);
        });
    };

    const columnCount = items[0].textItems.length + 1;
    const gridClasses = [
        "grid grid-cols-[1fr_max-content]",
        "grid grid-cols-[1fr_1fr_max-content]",
        "grid grid-cols-[1fr_1fr_1fr_max-content]",
    ]
    const gridClass = gridClasses[columnCount - 2]

    return (
        <>
            <ErrorDialog
                open={!!errorMessage}
                message={errorMessage}
                onClose={() => setErrorMessage("")}
            />



            <SectionWrapper customClass="max-w-200 w-full flex-1 flex flex-col justify-start items-center overflow-scroll">
                <ul className={`w-full gap-x-4 ${gridClass}`}>
                    <p className="mb-6 font-bold">Name</p>
                    {columnCount >= 3 &&
                        <p className="mb-6 font-bold">Plural</p>}
                    {columnCount === 4 &&
                        <p className="mb-6 font-bold">Abbreviation</p>}
                    <div></div>

                    <input
                        type="text"
                        className={`block h-(--btn-h-md) w-full p-2 bg-white/75 text-text rounded-lg border border-gray-500 col-span-full mb-4`}
                        name="searchParam"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={"Search …"}
                    />


                    {filteredItems.map((item) => (
                        <React.Fragment key={item.id}>
                            <ListItem
                                item={item}
                                onEditButton={onEditButton}
                                onDeleteAction={removeItemById.bind(null, item.id)}
                            />
                        </React.Fragment>
                    ))}
                </ul>
            </SectionWrapper>
        </>
    );
}