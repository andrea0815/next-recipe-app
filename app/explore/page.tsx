import React from 'react';
import { getOtherRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import type { RecipeListItem } from '@/types/recipe';

import RecipeGalleryWrapper from '@/components/containers/RecipeGalleryWrapper';
import { RecipeListType } from '@/types/general';
import RecipeListClient from '@/components/recipe/RecipeListClient';



export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ category: string }> }) {

    const user = await getCurrentDbUser();

    const { category } = await searchParams;

    let categoryId: string | undefined;

    if (category) {
        categoryId = await getCategoryIdFromName(category, user?.id);
    }
    const categoryIds = categoryId ? [categoryId] : [];
    const listKey = categoryIds.join(",") || "all";


    const initialData = await getOtherRecipes({
        userId: user?.id,
        categoryIds: categoryIds,
        take: 12,
    });

    return (
        <RecipeGalleryWrapper>
            {/* <RecipeList recipes={initialData} type={RecipeListType.EXPLORE}></RecipeList> */}
            <RecipeListClient
                key={listKey}
                initialRecipes={initialData.recipes}
                initialNextCursor={initialData.nextCursor}
                initialHasMore={initialData.hasMore}
                categoryIds={categoryIds}
                getUrl={"/api/recipes/other"}
                mode={RecipeListType.EXPLORE}
            />
        </RecipeGalleryWrapper>
    );
}
