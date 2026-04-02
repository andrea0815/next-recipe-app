import React from 'react';
import { getUserRecipes } from "@/lib/db/recipes";
import { getCategoryIdFromName } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import RecipeList from '@/components/recipe/RecipeList';
import type { RecipeListItem } from '@/types/recipe';
import { redirect } from 'next/navigation';
import { get } from 'http';
import Button from '@/components/buttons/Button';


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
            <Button href='/collection/create'>Create new Recipe</Button>
            <RecipeList recipes={recipes}></RecipeList>
        </div>
    );
}
