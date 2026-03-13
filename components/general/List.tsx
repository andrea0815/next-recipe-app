import React from 'react';
import ListItem_Category from './ListItem_Category';
import ListItem_Unit from './ListItem_Unit';
import ListItem_Ingredient from './ListItem_Ingredient';
import { ItemType } from '@/types/general';

export default function List({
    array,
    type }: {
        array: any[],
        type: ItemType
    }) {
    return (
        <ul>
            {
                array.map((item, index) => (
                    <li key={item.id}>
                        {type === ItemType.CATEGORY &&
                            <ListItem_Category item={item} />
                        }
                        {type === ItemType.INGREDIENT &&
                            <ListItem_Ingredient item={item} />
                        }
                        {type === ItemType.UNIT &&
                            <ListItem_Unit item={item} />
                        }
                    </li>
                ))
            }

        </ul>
    );
}
