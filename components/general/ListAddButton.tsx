import React from 'react';
import { ITEM_META } from "@/types/general";
import type { ItemType } from "@/types/general";
import Button from '../buttons/Button';
import IconAdd from '../icons/IconAdd';

export default function ListAddButton({
    type,
    onPress
}: {
    type: ItemType,
    onPress: () => void
}) {
    const meta = ITEM_META[type];

    return (
        <div className="flex flex-col items-center gap-2 w-full">
            <Button
                type="button"
                onClick={() => onPress()}
                customClass="flex md:hidden w-full"
                size="huge"
            >
                <IconAdd /> Add {meta.name.charAt(0).toUpperCase() + meta.name.slice(1)}
            </Button>

            <Button
                type="button"
                onClick={() => onPress()}
                customClass="fixed top-6 right-6 z-50 hidden w-fit md:flex"
            >
                <IconAdd /> Add {meta.name.charAt(0).toUpperCase() + meta.name.slice(1)}
            </Button>
        </div>
    );
}