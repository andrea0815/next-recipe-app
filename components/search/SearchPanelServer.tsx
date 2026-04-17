import React, { Suspense } from 'react';
import SearchPanel from './SearchPanel';
import { getIngredientsByUserId } from '@/lib/db/ingredients';

export default async function SearchPanelServer({ userId }: { userId: string }) {
    
    const ingredients = await getIngredientsByUserId(undefined, userId);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchPanel ingredients={ingredients} />
            </Suspense>
        </>
    );
}
