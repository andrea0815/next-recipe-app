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
import Button from '@/components/buttons/Button';
import IconAdd from '@/components/icons/IconAdd';

export default async function ExplorePage() {

    const user = await getCurrentDbUser();

    return (<>
        <Suspense fallback={<HeaderTabBarSkeleton />}>
            <HeaderTabBar type={RecipeListType.EXPLORE} userId={user?.id ?? null} />
        </Suspense>

        <GeneralSection>

            <RecipeGalleryWrapper>

                <div className="flex flex-col items-center gap-4 w-full">

                    {!user && <>
                        <div className='flex flex-col gap-2 w-full'>
                            <Button
                                href="/sign-up"
                                customClass="flex md:hidden w-full"
                                size="big"
                                stretch={true}
                            >
                                Create Account
                            </Button>

                            <Button
                                href="/sign-in"
                                customClass="flex md:hidden w-full"
                                size="big"
                                priority='secondary'
                                stretch={true}
                            >
                                Sign in
                            </Button>
                        </div>

                        <div className="fixed z-10 top-6 right-6 w-fit md:flex hidden gap-2">

                            <Button
                                href="/sign-up"
                            >
                                Create Account
                            </Button>

                            <Button
                                href="/sign-in"
                                priority='secondary'
                            >
                                Sign in
                            </Button>
                        </div>
                    </>
                    }

                    <Suspense fallback={<SearchPanelSkeleton />}>
                        <SearchPanelServer userId={user?.id ?? null} />
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
