import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';
import TabBar from './TabBar';

export default async function HeaderTabBarSkeleton() {
    return (
        <HeaderSectionWrapper>
            <TabBar>
                {Array.from({ length: 20 }).map((_, index) => (
                    <div key={index} className='px-4 py-4 text-sm whitespace-nowrap cursor-pointer'>
                        <div className="h-5 w-12.5 shrink-0 rounded-full bg-gray-200 animate-pulse" />
                    </div>
                ))}
            </TabBar>
        </HeaderSectionWrapper >
    );
}

