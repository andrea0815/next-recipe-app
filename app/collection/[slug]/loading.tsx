"use server"

import { getRecipeBySlug } from "@/lib/db/recipes";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import { notFound } from "next/navigation";

import RecipeDetailSection from "@/components/recipe/RecipeDetailSection";
import { RecipeListType } from "@/types/general";
import GeneralSection from "@/components/containers/GeneralSection";
import HeaderRecipeDetail from "@/components/nav/HeaderRecipeDetail";
import RecipeDetailSectionSkeleton from "@/components/recipe/RecipeDetailSectionSkeleton";
import HeaderRecipeDetailSkeleton from "@/components/nav/HeaderRecipeDetailSkeleton";


export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {

    return (
        <>
            <HeaderRecipeDetailSkeleton isOwner={true}/>
            <GeneralSection>
                <RecipeDetailSectionSkeleton />
            </GeneralSection>
        </>
    );
}
