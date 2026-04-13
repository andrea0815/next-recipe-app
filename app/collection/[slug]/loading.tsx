"use server"

import GeneralSection from "@/components/containers/GeneralSection";
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
