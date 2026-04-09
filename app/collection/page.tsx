import React from 'react';
import { getUserRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import Button from '@/components/buttons/Button';
import RecipeGalleryWrapper from '@/components/containers/RecipeGalleryWrapper';
import { RecipeListType } from '@/types/general';
import RecipeListClient from '@/components/recipe/RecipeListClient';
import SearchPanelServer from '@/components/search/SearchPanelServer';

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
                <div className='flex flex-col gap-2'>
                    <SearchPanelServer />
                    <Button
                        href='/collection/create'
                        customClass='h-[74px]'
                    >Create new Recipe</Button>
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
