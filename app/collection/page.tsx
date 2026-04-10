import React from 'react';
import { getUserRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getIngredientIdFromName } from "@/lib/db/ingredients";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import RecipeGalleryWrapper from '@/components/containers/RecipeGalleryWrapper';
import { RecipeListType } from '@/types/general';
import RecipeListClient from '@/components/recipe/RecipeListClient';
import SearchPanelServer from '@/components/search/SearchPanelServer';
import Link from 'next/link';

export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ category: string, ingredients?: string | string[], query: string }> }) {

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

    const initialData = await getUserRecipes({
        query,
        userId: user?.id,
        categoryIds,
        ingredientIds,
        take: 12,
    });

    return (
        <>
            <RecipeGalleryWrapper>
                <div className='flex flex-col items-center gap-2 sm:max-w-150 w-full'>
                    <SearchPanelServer/>
                    <Link
                        href='/collection/create'
                        className='w-full h-30 flex justify-center items-center rounded-xl border-2 font-semibold border-primary'>
                        Create new Recipe
                    </Link>
                </div>
                <RecipeListClient
                    key={listKey}
                    initialRecipes={initialData.recipes}
                    initialNextCursor={initialData.nextCursor}
                    initialHasMore={initialData.hasMore}
                    categoryIds={categoryIds}
                    getUrl={"/api/recipes/user"}
                    mode={RecipeListType.COLLECTION}
                />
            </RecipeGalleryWrapper>
        </>
    );
}
