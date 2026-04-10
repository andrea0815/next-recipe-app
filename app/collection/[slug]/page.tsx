"use server"

import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import { notFound } from "next/navigation";

import DeleteButton from "@/components/buttons/DeleteButton";
import Button from "@/components/buttons/Button";
import Tag from "@/components/general/Tag";
import SectionWrapper from "@/components/containers/SectionWrapper";
import IngredientSection from "./IngredientSection";
import RecipeDetailSection from "@/components/recipe/RecipeDetailSection";
import { RecipeListType } from "@/types/general";


export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const user = await getCurrentDbUser();

    if (!user) {
        notFound();
    }

    const recipe = await getRecipeBySlug(slug, user.id);

    if (!recipe) {
        notFound();
    }

    const safeIngredients = recipe.recipe_ingredients.map((recipeIngredient) => ({
        ...recipeIngredient,
        amount: Number(recipeIngredient.amount),
        position: Number(recipeIngredient.position),
    }));

    const groupedIngredients = [...safeIngredients]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .reduce((acc, recipeIngredient) => {
            const groupName = recipe.groups_enabled
                ? recipeIngredient.group_name?.trim() || "General"
                : "Zutaten";

            if (!acc[groupName]) {
                acc[groupName] = [];
            }

            acc[groupName].push(recipeIngredient);
            return acc;
        }, {} as Record<string, typeof safeIngredients>);

    const isOwner = recipe.owner_id === user.id;

    return (
        <RecipeDetailSection
            recipe={recipe}
            isOwnRecipe={isOwner}
            type={RecipeListType.COLLECTION}
            groupedIngredients={groupedIngredients}
        />
    );
}
