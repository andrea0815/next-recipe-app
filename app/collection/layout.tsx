import HeaderSectionWrapper from '@/components/containers/HeaderSectionWrapper';
import GeneralSection from '@/components/containers/GeneralSection';
import TabBar from '@/components/nav/TabBar';
import TabBarItem from '@/components/nav/TabBarItem';
import { getCategoriesByUserId } from '@/lib/db/categories';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

import type { Category } from '@/types/category';

export default async function CollectionLayout({ children }: { children: any }) {

    const user = await getCurrentDbUser();
    const categories: Category[] = await getCategoriesByUserId(undefined, user?.id ?? undefined);

    return (
        <>
            <HeaderSectionWrapper>
                <TabBar>
                    {categories.map((category) => (
                        <TabBarItem key={category.id} href={`/collection?category=${category.name}`}>
                            {category.name}
                        </TabBarItem>
                    ))}
                </TabBar>
            </HeaderSectionWrapper>
            <GeneralSection>
                {children}
            </GeneralSection>
        </>
    );
}
