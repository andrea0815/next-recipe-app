import React from 'react';
import SearchPanel from './SearchPanel';
import { getIngredientsByUserId } from '@/lib/db/ingredients';
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";

export default async function SearchPanelServer() {

    const user = await getCurrentDbUser();

    const ingredients = await getIngredientsByUserId(undefined, user?.id);

    return (
        <>
            <SearchPanel ingredients={ingredients} />
        </>
    );
}
