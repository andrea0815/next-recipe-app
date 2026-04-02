"use client";

import { removeRecipe } from "@/actions/recipes";
import Link from "next/dist/client/link";
import Form from "next/form";
import { useOptimistic } from "react";

import type { RecipeListItem } from '@/types/recipe';
import Icon from "../icons/Icon";
import Tag from "../general/Tag";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }: { recipes: RecipeListItem[] }) {

    const [optimisticRecipes, setOptimisticRecipes] = useOptimistic(
        recipes,
        (currentRecipes, recipeId) => {
            return currentRecipes.filter(recipe => recipe.id !== recipeId);
        }
    );

    if (recipes.length === 0)
        return (
            <div className="flex flex-col items-center gap-3 text-text-light py-[20dvh]">
                <p>No recipes found.</p>
            </div>
        );


    return (
        <ul className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">


            {optimisticRecipes.map((recipe) => (
                <li
                    key={recipe.id}
                    className="p-3 bg-section rounded-2xl text-text"
                >
                    <RecipeCard recipe={recipe} />
                </li>
            ))
            }
        </ul >
    );
}
