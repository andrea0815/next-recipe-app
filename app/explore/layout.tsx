import TabBar from '@/components/nav/TabBar';
import HeaderSectionWrapper from '@/components/containers/HeaderSectionWrapper';
import GeneralSection from '@/components/containers/GeneralSection';
import TabBarItem from '@/components/nav/TabBarItem';

export default function ExploreLayout({ children }: { children: any }) {
    return (
        <>
            <HeaderSectionWrapper>
            </HeaderSectionWrapper>
            <GeneralSection>
                {children}
            </GeneralSection>
        </>
    );
}
