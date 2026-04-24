"use client";

import React, { useEffect, useTransition, useState } from "react";
import { showErrorToast, showSuccessToast } from "./ToastProvider";

import type { ActionResult } from "@/types/actions";
import type { ItemType, ListItem as ListItemType } from "@/types/general"

import SectionWrapper from "../containers/SectionWrapper";
import ListItem from "../general/ListItem";
import { useRouter } from "next/navigation";

type ListSectionProps = {
    type: ItemType;
    items: ListItemType[];
    removeItem: (id: string) => Promise<ActionResult>;
    onEditButton: (item: ListItemType) => void;
};

export default function ListSection({ type, items, removeItem, onEditButton }: ListSectionProps) {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [localItems, setLocalItems] = useState(items);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setLocalItems(items);
    }, [items]);

    const filteredItems = localItems.filter((item) =>
        item.textItems.some((text) =>
            text.value.toLowerCase().includes(query.toLowerCase())
        )
    );

    const removeItemById = async (itemId: string) => {
        const previousItems = localItems;

        setLocalItems((prev) => prev.filter((item) => item.id !== itemId));

        const result = await removeItem(itemId);

        if (!result.success) {
            setLocalItems(previousItems);
            showErrorToast(result.message ?? "Something went wrong.");
            return;
        }

        showSuccessToast(result.message ?? "Item deleted successfully.");

        startTransition(() => {
            router.refresh();
        });
    };

    const columnCount = (items[0]?.textItems.length ?? 0) + 1;
    const gridClasses = [
        "grid grid-cols-[1fr_max-content]",
        "grid grid-cols-[1fr_1fr_max-content]",
        "grid grid-cols-[1fr_1fr_1fr_max-content]",
    ]
    const gridClass = gridClasses[columnCount - 2]

    return (
        <>
            <SectionWrapper customClass="max-w-200 w-full flex-1 min-h-200">
                <div className="overflow-scroll pr-4 flex flex-col justify-start items-center ">
                    <ul className={`w-full gap-x-4 ${gridClass}`}>
                        <p className="mb-4 font-bold">Name</p>
                        {columnCount >= 3 &&
                            <p className="mb-4 font-bold">Plural</p>}
                        {columnCount === 4 &&
                            <p className="mb-4 font-bold">Abbreviation</p>}
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
                                    type={type}
                                    onEditButton={onEditButton}
                                    onDeleteAction={removeItemById.bind(null, item.id)}
                                    isPendingOnDelete={isPending}
                                />
                            </React.Fragment>
                        ))}
                    </ul>
                </div>

            </SectionWrapper>
        </>
    );
}