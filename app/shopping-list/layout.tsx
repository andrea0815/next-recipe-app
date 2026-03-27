import HeaderSectionWrapper from '@/components/containers/HeaderSectionWrapper';
import GeneralSection from '@/components/containers/GeneralSection';

export default function ShoppingListLayout({children}: {children: any}) {
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
