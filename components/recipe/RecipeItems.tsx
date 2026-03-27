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

    return (
        <ul className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {optimisticRecipes.map((recipe) => (
                <li
                    key={recipe.id}
                    className="p-3 bg-section rounded-2xl text-text"
                >
                    <Link href={`/collection/${recipe.slug}`}>

                        <div className="relative">

                            {recipe.image_uri && (
                                <img src={recipe.image_uri} alt={recipe.name} className="w-full h-48 object-cover rounded-xl" />
                            )}
                            <p className="absolute top-3 right-3">{recipe.is_public ? 'Public' : 'Private'}</p>

                        </div>

                        <h2 className="text-xl font-semibold">
                            {recipe.name}
                        </h2>

                        <p>{recipe.subtitle}</p>


                        {recipe.categories && (
                            <div className="my-2 flex flex-row flex-wrap gap-2">
                                {recipe.categories.map((category) => (
                                    <p key={category.id} className="bg-white text-text py-1 px-2 inline-block rounded-3xl ">{category.name}</p>
                                ))
                                }
                            </div>
                        )}
                    </Link>
                </li>
            ))
            }
        </ul >
    );
}
