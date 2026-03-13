"use client";

import { useOptimistic } from "react";

import type { Ingredient } from '@/types/ingredient';

export default function IngredientItems({ ingredients }: { ingredients: Ingredient[] }) {

    const [optimisticIngredients, setOptimisticIngredients] = useOptimistic(
        ingredients,
        (currentIngredients, ingredientId) => {
            return currentIngredients.filter(ingredient => ingredient.id !== ingredientId);
        }
    );

    return (
        <div>
            <h2 className="text-md font-bold">Ingredients</h2>
            <ul className="">
                {optimisticIngredients.map((ingredient) => (
                    <li
                        key={ingredient.id}
                        className=""
                    >
                        <p className="text-sm">
                            {ingredient.name}
                        </p>

                    </li>
                ))}
            </ul>
        </div>
    );
}
