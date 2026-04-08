import GeneralSection from '@/components/containers/GeneralSection';
import HeaderSection from '@/components/nav/HeaderSection';
import HeaderTabBar from '@/components/nav/HeaderTabBar';


export default function CollectionLayout({ children }: { children: any }) {

    return (
        <>
            <HeaderSection rootUrl="/collection" tabBarHeader={<HeaderTabBar />} />
            <GeneralSection>
                {children}
            </GeneralSection>
        </>
    );
}
