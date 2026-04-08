"use client";

import { startTransition, useOptimistic, useState } from "react";
import ListItem from "../general/ListItem";
import ListAddButton from "./ListAddButton";
import ErrorDialog from "../errors/ErrorDialog";
import type { ActionResult } from "@/types/actions";
import type { ItemType } from "@/types/general"
import SectionWrapper from "../containers/SectionWrapper";

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
            setErrorMessage(result.message ?? "Something went wrong.");
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

            <SectionWrapper customClass="max-w-200 w-full flex-1 flex flex-col justify-center items-center">
                <ListAddButton type={type} />
                <ul className="flex flex-col w-full">
                    <li className="flex ">
                        <p>Name</p>
                        <p>Plural</p>
                        <p >Abbreviation</p>
                    </li>
                    {optimisticItems.map((item) => (
                        <ListItem
                            key={item.id}
                            id={item.id}
                            editHref={item.editHref}
                            onDeleteAction={removeItemById.bind(null, item.id)}
                            textItems={item.textItems}
                        />
                    ))}
                </ul>
            </SectionWrapper>
        </>
    );
}