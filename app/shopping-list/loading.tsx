import React from 'react';
import ShoppingListSkeleton from './ShoppingListSkeleton';
import SectionWrapper from '@/components/containers/SectionWrapper';

export default function loading() {
    return (
        <ShoppingListSkeleton />
    );
}
