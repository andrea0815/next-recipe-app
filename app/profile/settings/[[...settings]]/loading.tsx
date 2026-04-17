import React from 'react';
import ShoppingListSkeleton from '@/components/shoppinglist/ShoppingListSkeleton';
import SectionWrapper from '@/components/containers/SectionWrapper';

export default function loading() {
    return (
        <ShoppingListSkeleton />
    );
}
