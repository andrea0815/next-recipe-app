import ButtonLink from '@/components/buttons/ButtonLink';

import React from 'react';
import { getUserRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import RecipeList from '@/components/recipe/RecipeList';
import type { RecipeListItem } from '@/types/recipe';
import { redirect } from 'next/navigation';
import { get } from 'http';


export default async function CollectionPage({ searchParams }: { searchParams: Promise<{ category: string }> }) {

    const user = await getCurrentDbUser();

    const { category } = await searchParams;

    let categoryId: string | undefined;

    if (category) {
        categoryId = await getCategoryIdFromName(category, user?.id);
    }

    const recipes: RecipeListItem[] = await getUserRecipes(
        undefined,
        user?.id ?? undefined,
        categoryId ? [categoryId] : []
    );

    return (
        <div className='flex flex-col gap-6'>
            <ButtonLink link='/collection/create' text='Create new Recipe' />
            <RecipeList recipes={recipes}></RecipeList>
        </div>
    );
}
