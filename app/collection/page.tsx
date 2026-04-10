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
import IconAdd from '@/components/icons/IconAdd';
import Button from '@/components/buttons/Button';

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
                    <Button
                        href="/collection/create"
                        customClass="flex md:hidden w-full"
                        size='huge'
                    >
                        <IconAdd /> Create new Recipe
                    </Button>
                    <Button
                        href="/collection/create"
                        customClass="fixed z-10 top-6 right-6 w-fit md:flex hidden"
                    >
                        <IconAdd /> Create new Recipe
                    </Button>
                    <SearchPanelServer />
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
