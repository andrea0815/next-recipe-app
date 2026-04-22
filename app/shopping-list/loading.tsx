import React from 'react';
import ShoppingListSkeleton from '@/components/shoppinglist/ShoppingListSkeleton';
import SectionWrapper from '@/components/containers/SectionWrapper';
import GeneralSection from '@/components/containers/GeneralSection';

export default function loading() {
    return (
        <GeneralSection>
            <ShoppingListSkeleton />
        </GeneralSection>
    );
}
