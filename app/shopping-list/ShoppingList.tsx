import React from 'react';
import ShoppingListCheckbox from "@/components/recipe/ShoppingListCheckbox";

export default function ShoppingList({ items }: { items: any[] }) {

    if (items.length === 0)
        return (
            <p className='text-center text-gray-500 self-center'>Your shopping list is empty.</p>
        )

    return (
        <ul className='w-full'>
            {items.map((item) => (
                <li key={item.id}
                    className="flex py-2 border-b last-of-type:border-b-0 border-gray-300 items-center gap-4">
                    <ShoppingListCheckbox
                        recipeIngredientId={item.id}
                        initialChecked={!!item.on_shopping_list}
                    />
                    <p>{Number(item.amount)}</p>
                    <p>{item.unit.abbreviation}</p>
                    <p>{item.ingredient.name}</p>
                </li>
            ))}
        </ul>
    );
}
