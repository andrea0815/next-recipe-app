import { getCategoriesByUserId } from '@/lib/db/categories';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import type { Category } from '@/types/category';

import HeaderSectionWrapper from '@/components/containers/HeaderSectionWrapper';
import GeneralSection from '@/components/containers/GeneralSection';
import TabBar from '@/components/nav/TabBar';
import TabBarItem from '@/components/nav/TabBarItem';
import HeaderSection from '@/components/nav/HeaderSection';
import HeaderTabBar from '@/components/nav/HeaderTabBar';

export default async function CollectionLayout({ children }: { children: any }) {

    const user = await getCurrentDbUser();
    const categories: Category[] = await getCategoriesByUserId(undefined, user?.id ?? undefined);

    return (
        <>
            <HeaderSection rootUrl="/explore" tabBarHeader={<HeaderTabBar />} />
            <GeneralSection>
                {children}
            </GeneralSection>
        </>
    );
}
