import React, { Suspense } from 'react';
import { getCategoryIdFromName, getCategoriesByUserId } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import type { Category } from '@/types/category';

import TabBar from '@/components/nav/TabBar';
import TabBarItem from '@/components/nav/TabBarItem';
import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';
import TabBarItemSkeleton from './TabBarItemSkeleton';

export default async function HeaderTabBar() {
    const user = await getCurrentDbUser();
    const categories: Category[] = await getCategoriesByUserId(undefined, user?.id ?? undefined);

    return (
        <HeaderSectionWrapper>
            <TabBar>
                <Suspense fallback={<TabBarItemSkeleton />}>
                    <TabBarItem key={0} href={`/collection`} text='All' />
                </Suspense>
                {categories.map((category) => (
                    <Suspense key={category.id} fallback={<TabBarItemSkeleton />}>
                        <TabBarItem href={`/collection?category=${category.name}`} text={category.name} />
                    </Suspense>
                ))}
            </TabBar>
        </HeaderSectionWrapper>
    );
}
