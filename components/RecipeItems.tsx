"use client";

import { removeRecipe } from "@/actions/recipes";
import { getRecipes } from "@/lib/db/recipes";
import Link from "next/dist/client/link";
import Form from "next/form";
import { useOptimistic } from "react";

type Recipe = {
    id: string;
    name: string;
    subtitle: string;
    image_uri: string | null;
}

export default function RecipeItems({ recipes }: { recipes: Recipe[] }) {

    const [optimisticRecipes, setOptimisticRecipes] = useOptimistic(
        recipes,
        (currentRecipes, recipeId) => {
            return currentRecipes.filter(recipe => recipe.id !== recipeId);
        }
    );

    const removeRecipeById = async (recipeId: string) => {
        setOptimisticRecipes(recipeId);
        await removeRecipe(recipeId);
    }

    return (
        <ul className="space-y-4 p-4 flex gap-2">
            {optimisticRecipes.map((recipe) => (
                <li
                    key={recipe.id}
                    className="p-4 bg-gray-700 shadow-md rounded-lg text-white"
                >
                    <h2 className="text-xl font-semibold">
                        <Link href={`/recipes/${recipe.name}`}>{recipe.name}</Link>
                    </h2>

                    <p>{recipe.subtitle}</p>

                    {recipe.image_uri && (
                        <img src={recipe.image_uri} alt={recipe.name} className="w-full h-48 object-cover rounded-lg mt-2" />
                    )}

                    <Form action={removeRecipeById.bind(null, recipe.id)}>
                        <button
                            type="submit"
                            className="p-2 text-white bg-red-500 rounded disabled:bg-gray-500"
                        >
                            Delete
                        </button>
                    </Form>
                </li>
            ))}
        </ul>
    );
}
