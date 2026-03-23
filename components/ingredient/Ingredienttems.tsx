"use client";

import { useOptimistic } from "react";
import { removeIngredient } from "@/actions/ingredients";


import type { Ingredient } from '@/types/ingredient';
import ListItem from "../general/ListItem";

export default function IngredientItems({ ingredients }: { ingredients: Ingredient[] }) {

    const [optimisticIngredients, setOptimisticIngredients] = useOptimistic(
        ingredients,
        (currentIngredients, ingredientId) => {
            return currentIngredients.filter(ingredient => ingredient.id !== ingredientId);
        }
    );

    const removeIngredientById = async (recipeId: string) => {
        setOptimisticIngredients(recipeId);
        await removeIngredient(recipeId);
    }

    return (
        <ul className="">
            {optimisticIngredients.map((ingredient) => (
                <>
                    <ListItem
                        key={ingredient.id}
                        id={ingredient.id}
                        editHref={`/ingredients/${ingredient.id}/edit`}
                        onDeleteAction={removeIngredientById.bind(null, ingredient.id)}
                        textItems={[ingredient.name, ingredient.plural || "–"]}
                    />

                </>
            ))}
        </ul>
    );
}
