import React from 'react';
import ButtonLink from '../buttons/ButtonLink';
import { ITEM_META } from "@/types/general"
import type { ItemType } from "@/types/general"
import Button from '../buttons/Button';

export default function ListAddButton({ type }: { type: ItemType }) {

    const meta = ITEM_META[type];

    return (
        <div className='fixed bottom-6 right-6'>

            <Button
                href={`/profile/${meta.plural}/create`}
                stretch={false}
                size='big'
            > Add {meta.name}</Button>
        </div>
    );
}
