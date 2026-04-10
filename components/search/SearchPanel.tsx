"use client"

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import type { Ingredient } from '@/types/ingredient';
import type { SearchParams } from '@/types/search';

import SearchBar from './SearchBar';
import SearchPanelContent from './SearchPanelContent';

export default function SearchPanel({
    ingredients,
}: {
    ingredients: Ingredient[]
}) {

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const category = params.get("category");
    const query = params.get("query");
    const ingredientNames = params.getAll("ingredients");

    const initialSearchParams = {
        query: query ?? "",
        category: category ?? "",
        ingredient_names: ingredientNames,
    }

    const [open, setOpen] = useState(false)
    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams)

    console.log(searchParams);

    useEffect(() => {
        setSearchParams({
            query: query ?? "",
            category: category ?? "",
            ingredient_names: ingredientNames,
        });
        setOpen(false);
    }, [category, query, ingredientNames.join(",")]);

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
        setSearchParams(initialSearchParams);
    }

    function handleSearchButton() {
        const params = new URLSearchParams();

        if (searchParams.query?.trim()) {
            params.set("query", searchParams.query.trim());
        }

        if (searchParams.category?.trim()) {
            params.set("category", searchParams.category.trim());
        }

        for (const ingredientName of searchParams.ingredient_names) {
            params.append("ingredients", ingredientName);
        }

        setOpen(false);

        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname);
    }

    function handleQuerySearchButton() {
        const params = new URLSearchParams();

        if (searchParams.query?.trim()) {
            params.set("query", searchParams.query.trim());
        }

        if (searchParams.category?.trim()) {
            params.set("category", searchParams.category.trim());
        }

        setOpen(false);

        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname);
    }

    return (
        <div className='relative h-20 w-full sm:my-5 flex justify-center items-start'>
            <div className='absolute left-1/2 top-0 -translate-x-1/2 z-5 flex flex-col justify-start items-center rounded-xl w-full sm:max-w-200'>
                <SearchBar onFilterClick={() => setOpen((prev) => !prev)} isOpen={open} query={searchParams.query} onSearchClick={handleQuerySearchButton} onQueryChange={(query) => updateSearchParams("query", query)} />
                <SearchPanelContent
                    isOpen={open}
                    ingredients={ingredients}
                    selectedIngredients={searchParams.ingredient_names}
                    onSearchButton={() => handleSearchButton()}
                    onClearButton={() => handleClearButton()}
                    onIngredientsChange={(names) => updateSearchParams("ingredient_names", names)}
                />
                <div className='absolute inset-0 -z-10 backdrop-blur-sm bg-section-50 rounded-xl'></div>
            </div>
        </div>
    );
}
