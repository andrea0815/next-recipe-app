import React from 'react';
import { getUserRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import Button from '@/components/buttons/Button';
import RecipeGalleryWrapper from '@/components/containers/RecipeGalleryWrapper';
import { RecipeListType } from '@/types/general';
import RecipeListClient from '@/components/recipe/RecipeListClient';
import SearchPanelServer from '@/components/search/SearchPanelServer';
import Link from 'next/link';

export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ category: string }> }) {

    const user = await getCurrentDbUser();

    const { category } = await searchParams;
    let categoryId: string | undefined;
    if (category) {
        categoryId = await getCategoryIdFromName(category, user?.id);
    }
    const categoryIds = categoryId ? [categoryId] : [];
    const listKey = categoryIds.join(",") || "all";

    const initialData = await getUserRecipes({
        userId: user?.id,
        categoryIds: categoryIds,
        take: 12,
    });

    return (
        <>
            <RecipeGalleryWrapper>
                <div className='flex flex-col items-center gap-2 sm:max-w-150 w-full'>
                    <SearchPanelServer />
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
