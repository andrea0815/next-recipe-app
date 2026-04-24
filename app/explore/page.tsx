import React, { Suspense } from 'react';
import { getOtherRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getIngredientIdsFromNames } from "@/lib/db/ingredients";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import RecipeGalleryWrapper from '@/components/containers/RecipeGalleryWrapper';
import { RecipeListType } from '@/types/general';
import RecipeListClient from '@/components/recipe/RecipeListClient';
import SearchPanelServer from '@/components/search/SearchPanelServer';
import GeneralSection from '@/components/containers/GeneralSection';
import HeaderTabBar from '@/components/nav/HeaderTabBar';
import HeaderTabBarSkeleton from '@/components/nav/HeaderTabBarSkeleton';
import SearchPanelSkeleton from '@/components/search/SearchPanelSkeleton';
import RecipeToastHandler from '@/components/recipe/RecipeToastHandler';

export default async function ExplorePage() {

    const user = await getCurrentDbUser();

    if (!user) {
        throw new Error("You must be signed in.");
    }

    return (<>
        <Suspense fallback={<HeaderTabBarSkeleton />}>
            <HeaderTabBar type={RecipeListType.EXPLORE} userId={user.id} />
        </Suspense>

        <GeneralSection>
            <RecipeGalleryWrapper>
                <div className="flex flex-col items-center gap-2 w-full">
                    <Suspense fallback={<SearchPanelSkeleton />}>
                        <SearchPanelServer userId={user.id} />
                    </Suspense>
                </div>
                <RecipeListClient
                    getUrl={"/api/recipes/others"}
                    mode={RecipeListType.EXPLORE}
                />
            </RecipeGalleryWrapper>
        </GeneralSection>

        <Suspense fallback={null}>
            <RecipeToastHandler />
        </Suspense>
    </>
    );
}
