"use client"

import { useState } from 'react';

import type { Ingredient } from '@/types/ingredient';

import SearchBar from './SearchBar';
import SearchPanelContent from './SearchPanelContent';
import { SearchParams } from '@/types/search';

export default function SearchPanel({
    ingredients,
}: {
    ingredients: Ingredient[]
}) {

    const initialSearchParams = {
        query: "",
        ingredient_ids: []
    }

    const [open, setOpen] = useState(false)
    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams)

    function updateSearchParams<K extends keyof SearchParams>(
        field: K,
        value: SearchParams[K]
    ) {
        setSearchParams((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function handleClearButton() {
        setSearchParams(initialSearchParams)
    }

    return (
        <div className='relative h-20 w-full my-5 flex justify-center items-start'>
            <div className='absolute left-1/2 top-0 -translate-x-1/2 z-5 flex flex-col justify-start items-center rounded-xl w-full sm:max-w-200'>
                <SearchBar onFilterClick={() => setOpen((prev) => !prev)} isOpen={open} query={searchParams.query} onQueryChange={(query) => updateSearchParams("query", query)} />
                <SearchPanelContent
                    isOpen={open}
                    ingredients={ingredients}
                    selectedIngredients={searchParams.ingredient_ids}
                    onSearchButton={() => setOpen(false)}
                    onClearButton={() => handleClearButton()}
                    onIngredientsChange={(ids) => updateSearchParams("ingredient_ids", ids)}
                />
                <div className='absolute inset-0 -z-10 backdrop-blur-sm bg-section-50 rounded-xl'></div>
            </div>
        </div>
    );
}
