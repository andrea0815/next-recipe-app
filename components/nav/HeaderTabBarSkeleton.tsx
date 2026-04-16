import HeaderSectionWrapper from '../containers/HeaderSectionWrapper';

export default async function HeaderTabBarSkeleton() {
    return (
        <HeaderSectionWrapper>
            <div className="w-full overflow-x-auto no-scrollbar overflow-hidden px-4 ">
                <div className="flex mx-auto gap-6 mb-4">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div key={index} className="h-8 w-20 shrink-0 rounded-xl bg-gray-200 animate-pulse" />
                    ))}
                </div>
            </div>
        </HeaderSectionWrapper >
    );
}

