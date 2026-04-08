import React from 'react';
import { getCategoryIdFromName, getCategoriesByUserId } from "@/lib/db/categories";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import type { Category } from '@/types/category';

import TabBar from '@/components/nav/TabBar';
import TabBarItem from '@/components/nav/TabBarItem';
import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';

export default async function HeaderTabBar() {
    const user = await getCurrentDbUser();
    const categories: Category[] = await getCategoriesByUserId(undefined, user?.id ?? undefined);

    return (
        <HeaderSectionWrapper>
            <TabBar>
                <TabBarItem key={0} href={`/collection`} text='All' />
                {categories.map((category) => (
                    <TabBarItem key={category.id} href={`/collection?category=${category.name}`} text={category.name} />
                ))}
            </TabBar>
        </HeaderSectionWrapper>
    );
}
