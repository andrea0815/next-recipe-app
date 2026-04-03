import React from 'react';
import { getOtherRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import type { RecipeListItem } from '@/types/recipe';

import RecipeList from '@/components/recipe/RecipeList';
import RecipeGalleryWrapper from '@/components/containers/RecipeGalleryWrapper';
import { RecipeListType } from '@/types/general';



export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ category: string }> }) {

    const user = await getCurrentDbUser();

    const { category } = await searchParams;

    let categoryId: string | undefined;

    if (category) {
        categoryId = await getCategoryIdFromName(category, user?.id);
    }

    const recipes: RecipeListItem[] = await getOtherRecipes(
        undefined,
        user?.id ?? undefined,
        categoryId ? [categoryId] : []
    );

    return (
        <RecipeGalleryWrapper>
            <RecipeList recipes={recipes} type={RecipeListType.EXPLORE}></RecipeList>
        </RecipeGalleryWrapper>
    );
}
