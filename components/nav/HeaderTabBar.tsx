import { Suspense } from 'react';
import { getCategoriesByUserId } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import type { Category } from '@/types/category';

import TabBar from '@/components/nav/TabBar';
import TabBarItem from '@/components/nav/TabBarItem';
import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';
import TabBarItemSkeleton from './TabBarItemSkeleton';
import { RecipeListType } from '@/types/general';

export default async function HeaderTabBar({ type }: { type: RecipeListType }) {
    const user = await getCurrentDbUser();
    const categories: Category[] = await getCategoriesByUserId(undefined, user?.id ?? undefined);

    const baseRoot = type === RecipeListType.COLLECTION ? "/collection" : "/explore"

    return (
        <HeaderSectionWrapper>
            <TabBar>
                <Suspense fallback={<TabBarItemSkeleton />}>
                    <TabBarItem key={0} href={baseRoot} text='All' />
                </Suspense>
                {categories.map((category) => (
                    <Suspense key={category.id} fallback={<TabBarItemSkeleton />}>
                        <TabBarItem href={`${baseRoot}?category=${category.name}`} text={category.name} />
                    </Suspense>
                ))}
            </TabBar>
        </HeaderSectionWrapper>
    );
}
