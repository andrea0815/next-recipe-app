"use server"

import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import { notFound } from "next/navigation";

import RecipeDetailSection from "@/components/recipe/RecipeDetailSection";
import { RecipeListType } from "@/types/general";
import GeneralSection from "@/components/containers/GeneralSection";
import HeaderRecipeDetail from "@/components/nav/HeaderRecipeDetail";
import { IngredientLineInput } from "@/types/recipe";


export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const user = await getCurrentDbUser();

    if (!user) {
        throw new Error("You must be signed in.");
    }

    const recipe = await getRecipeBySlug(slug, user.id);

    if (!recipe) {
        notFound();
    }

    const groupedIngredients = [...recipe.ingredients]
        .sort((a, b) => a.position - b.position)
        .reduce<Record<string, IngredientLineInput[]>>((acc, recipeIngredient) => {
            const groupName = recipe.groups_enabled
                ? recipeIngredient.group_name.trim() || "General"
                : "Zutaten";

            if (!acc[groupName]) {
                acc[groupName] = [];
            }

            acc[groupName].push(recipeIngredient);
            return acc;
        }, {});

    const isOwner = recipe.owner_id === user.id;

    return (<>
        <HeaderRecipeDetail recipeId={recipe.id} isOwner={isOwner} mode={RecipeListType.EXPLORE} />
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
