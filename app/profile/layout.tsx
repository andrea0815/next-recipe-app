import TabBar from '@/components/nav/TabBar';
import HeaderSectionWrapper from '@/components/containers/HeaderSectionWrapper';
import GeneralSection from '@/components/containers/GeneralSection';
import TabBarItem from '@/components/nav/TabBarItem';

export default function ProfileLayout({ children }: { children: any }) {
    return (
        <>
            <HeaderSectionWrapper>
                <TabBar>
                    <TabBarItem href='/profile/settings'>Settings</TabBarItem>
                    <TabBarItem href='/profile/categories'>Categories</TabBarItem>
                    <TabBarItem href='/profile/units'>Units</TabBarItem>
                    <TabBarItem href='/profile/ingredients'>Ingredients</TabBarItem>
                </TabBar>
            </HeaderSectionWrapper>
            <GeneralSection>
                {children}
            </GeneralSection>
        </>
    );
}
