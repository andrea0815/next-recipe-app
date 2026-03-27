import React from 'react';
import ButtonLink from '../buttons/ButtonLink';
import { ITEM_META } from "@/types/general"
import type { ItemType } from "@/types/general"

export default function ListAddButton({ type }: { type: ItemType }) {

    const meta = ITEM_META[type];
    console.log(meta);


    return (
        <ButtonLink
            text={`Add ${meta.name}`}
            link={`/profile/${meta.plural}/create`}
            stretch={false}
            textColor="white"
            isPrimary={true}
        />
    );
}
