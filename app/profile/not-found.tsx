import NotFoundClient from '@/components/errors/NotFoundClient';
import TabBar from '@/components/nav/TabBar';
import HeaderSectionWrapper from '@/components/containers/HeaderSectionWrapper';
import TabBarItem from '@/components/nav/TabBarItem';
import { Suspense } from 'react';
import TabBarItemSkeleton from '@/components/nav/TabBarItemSkeleton';

export default function NotFound() {

    return (<>
        <HeaderSectionWrapper>
            <TabBar>
                <Suspense fallback={<TabBarItemSkeleton />}>
                    <TabBarItem href='/profile/settings' text='Settings' />
                </Suspense>
                <Suspense fallback={<TabBarItemSkeleton />}>
                    <TabBarItem href='/profile/categories' text='Categories' />
                </Suspense>
                <Suspense fallback={<TabBarItemSkeleton />}>
                    <TabBarItem href='/profile/units' text='Units' />
                </Suspense>
                <Suspense fallback={<TabBarItemSkeleton />}>
                    <TabBarItem href='/profile/ingredients' text='Ingredients' />
                </Suspense>
            </TabBar>
        </HeaderSectionWrapper>
        <NotFoundClient />
    </>
    );
}
