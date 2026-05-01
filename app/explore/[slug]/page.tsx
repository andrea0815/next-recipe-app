"use server"

import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import RecipeDetailSection from "@/components/recipe/RecipeDetailSection";
import { RecipeListType } from "@/types/general";
import GeneralSection from "@/components/containers/GeneralSection";
import HeaderRecipeDetail from "@/components/nav/HeaderRecipeDetail";
import { IngredientLineInput } from "@/types/recipe";


type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;
    const recipe = await getRecipeBySlug(slug);

    if (!recipe) {
        return {
            title: "Recipe not found",
        };
    }

    const imageUrl = recipe.image_uri?.startsWith("http")
        ? recipe.image_uri
        : `${process.env.NEXT_PUBLIC_SITE_URL}${recipe.image_uri}`;

    return {
        title: recipe.name,
        description: recipe.subtitle || `Check out this recipe: ${recipe.name}`,
        openGraph: {
            title: recipe.name,
            description: recipe.subtitle || `Check out this recipe: ${recipe.name}`,
            type: "article",
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/explore/${recipe.slug}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: recipe.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: recipe.name,
            description: recipe.subtitle || `Check out this recipe: ${recipe.name}`,
            images: [imageUrl],
        },
    };
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const user = await getCurrentDbUser();

    const recipe = await getRecipeBySlug(slug, user?.id ?? undefined);

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

    const isOwner = user?.id ? recipe.owner_id === user?.id : false;

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
