import { Suspense } from 'react';
import { getUserRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getIngredientIdsFromNames } from "@/lib/db/ingredients";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import RecipeGalleryWrapper from '@/components/containers/RecipeGalleryWrapper';
import { RecipeListType } from '@/types/general';
import RecipeListClient from '@/components/recipe/RecipeListClient';
import SearchPanelServer from '@/components/search/SearchPanelServer';
import IconAdd from '@/components/icons/IconAdd';
import Button from '@/components/buttons/Button';
import GeneralSection from '@/components/containers/GeneralSection';
import HeaderTabBar from '@/components/nav/HeaderTabBar';
import RecipeToastHandler from '@/components/recipe/RecipeToastHandler';

export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ category: string, ingredients?: string | string[], query: string }> }) {

    const user = await getCurrentDbUser();

    if (!user) {
        throw new Error("You must be signed in.");
    }

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

    const ingredientIds = await getIngredientIdsFromNames(ingredientNames, user?.id);

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
            <HeaderTabBar type={RecipeListType.COLLECTION} />
            <GeneralSection>
                <RecipeGalleryWrapper>
                    <div className='flex flex-col items-center gap-2 w-full'>
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
                        <SearchPanelServer userId={user.id} />
                    </div>
                    <RecipeListClient
                        key={listKey}
                        initialRecipes={initialData.items}
                        initialNextCursor={initialData.nextCursor}
                        initialHasMore={initialData.hasMore}
                        categoryIds={categoryIds}
                        getUrl={"/api/recipes/user"}
                        mode={RecipeListType.COLLECTION}
                    />
                </RecipeGalleryWrapper>
            </GeneralSection>
            <Suspense fallback={null}>
                <RecipeToastHandler />
            </Suspense>
        </>
    );
}
