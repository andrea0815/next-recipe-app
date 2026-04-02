import React from 'react';
import { getOtherRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import type { RecipeListItem } from '@/types/recipe';

import RecipeList from '@/components/recipe/RecipeList';


export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ category: string }> }) {

    const user = await getCurrentDbUser();

    const { category } = await searchParams;

    let categoryId: string | undefined;

    if (category) {
        categoryId = await getCategoryIdFromName(category, user?.id);
    }

    const recipes: RecipeListItem[] = await getOtherRecipes(
        undefined,
        user?.id ?? undefined,
        categoryId ? [categoryId] : []
    );    

    return (
        <div className='flex flex-col gap-6'>
            <RecipeList recipes={recipes}></RecipeList>
        </div>
    );
}
