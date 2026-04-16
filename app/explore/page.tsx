import React from 'react';
import { getOtherRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getIngredientIdFromName } from "@/lib/db/ingredients";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import RecipeGalleryWrapper from '@/components/containers/RecipeGalleryWrapper';
import { RecipeListType } from '@/types/general';
import RecipeListClient from '@/components/recipe/RecipeListClient';
import SearchPanelServer from '@/components/search/SearchPanelServer';
import GeneralSection from '@/components/containers/GeneralSection';
import HeaderTabBar from '@/components/nav/HeaderTabBar';

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ category: string, ingredients?: string | string[], query: string }> }) {

    const user = await getCurrentDbUser();

    const { category, ingredients, query } = await searchParams;

    let categoryId: string | undefined;
    if (category) {
        categoryId = await getCategoryIdFromName(category, user?.id);
    }
    const categoryIds = categoryId ? [categoryId] : [];

    const ingredientNames = Array.isArray(ingredients)
        ? ingredients
        : ingredients
            ? [ingredients]
            : [];

    const ingredientIds = (
        await Promise.all(
            ingredientNames.map((ingredientName) =>
                getIngredientIdFromName(ingredientName, user?.id)
            )
        )
    ).filter((id): id is string => Boolean(id));

    const listKey =
        `${categoryIds.join(",") || "all"}-${ingredientIds.join(",") || "no-ingredients"}-${query || ""}`;

    const initialData = await getOtherRecipes({
        query,
        userId: user?.id,
        categoryIds,
        ingredientIds,
        take: 12,
    });

    return (<>
        <HeaderTabBar />
        <GeneralSection>
            <RecipeGalleryWrapper>
                <SearchPanelServer />
                <RecipeListClient
                    key={listKey}
                    initialRecipes={initialData.items}
                    initialNextCursor={initialData.nextCursor}
                    initialHasMore={initialData.hasMore}
                    categoryIds={categoryIds}
                    getUrl={"/api/recipes/other"}
                    mode={RecipeListType.EXPLORE}
                />
            </RecipeGalleryWrapper>
        </GeneralSection>
    </>
    );
}
