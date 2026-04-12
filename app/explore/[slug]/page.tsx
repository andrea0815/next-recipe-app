"use server"

import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import { notFound } from "next/navigation";

import Button from "@/components/buttons/Button";
import Tag from "@/components/general/Tag";
import SectionWrapper from "@/components/containers/SectionWrapper";
import IngredientSection from "./IngredientSection";
import RecipeDetailSection from "@/components/recipe/RecipeDetailSection";
import { RecipeListType } from "@/types/general";
import GeneralSection from "@/components/containers/GeneralSection";
import HeaderRecipeDetail from "@/components/nav/HeaderRecipeDetail";


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

    return (<>
        <HeaderRecipeDetail recipeId={recipe.id} isOwner={isOwner} />
        <GeneralSection>
            <RecipeDetailSection
                recipe={recipe}
                isOwnRecipe={isOwner}
                type={RecipeListType.EXPLORE}
                groupedIngredients={groupedIngredients}
            />
        </GeneralSection>
    </>
    );
}
