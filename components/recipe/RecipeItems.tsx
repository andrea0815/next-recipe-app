"use client";

import { removeRecipe } from "@/actions/recipes";
import Link from "next/dist/client/link";
import Form from "next/form";
import { useOptimistic } from "react";

import type { RecipeListItem } from '@/types/recipe';

export default function RecipeItems({ recipes }: { recipes: RecipeListItem[] }) {

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
        <ul className="space-y-4 p-4 flex flex-wrap gap-2">
            {optimisticRecipes.map((recipe) => (
                <li
                    key={recipe.id}
                    className="p-4 bg-gray-700 shadow-md rounded-lg text-white"
                >
                    <Link href={`/recipes/${recipe.slug}`}>
                        <h2 className="text-xl font-semibold">
                            {recipe.name}
                        </h2>

                        <p>{recipe.subtitle}</p>

                        <p>{recipe.is_public ? 'Public' : 'Private'}</p>

                        {recipe.categories && (
                            <div className="my-2 flex flex-row flex-wrap gap-2">
                                {recipe.categories.map((category) => (
                                    <p key={category.id} className="bg-white text-black py-1 px-2 inline-block rounded-3xl ">{category.name}</p>
                                ))
                                }
                            </div>
                        )}

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
                    </Link>
                </li>
            ))
            }
        </ul >
    );
}
