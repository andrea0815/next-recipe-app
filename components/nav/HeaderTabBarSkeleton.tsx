import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';
import TabBar from './TabBar';
import TabBarItemSkeleton from './TabBarItemSkeleton';

export default async function HeaderTabBarSkeleton({ count = 20 }: { count?: number }) {
    return (
        <HeaderSectionWrapper>
            <TabBar>
                {Array.from({ length: count }).map((_, index) => (
                    <TabBarItemSkeleton key={index} />
                ))}
            </TabBar>
        </HeaderSectionWrapper >
    );
}

