"use client"

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import type { Ingredient } from '@/types/ingredient';
import type { SearchParams } from '@/types/search';

import SearchBar from './SearchBar';
import SearchPanelContent from './SearchPanelContent';
import Tag from '../general/Tag';

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
        query: "",
        category: category ?? "",
        ingredient_names: ingredientNames ?? [],
    }

    const [open, setOpen] = useState(false)
    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams)


    useEffect(() => {
        setSearchParams({
            query: query ?? "",
            category: category ?? "",
            ingredient_names: ingredientNames ?? [],
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

        const params = new URLSearchParams();

        if (searchParams.query?.trim()) {
            params.delete("query");
        }

        if (searchParams.category?.trim()) {
            params.delete("category");
        }

        if (searchParams.ingredient_names.length > 0) {
            params.delete("ingredients");
        }

        setOpen(false);

        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname);
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

    function handleSearchWithQuery(query: string) {
        const params = new URLSearchParams();

        if (query.trim()) {
            params.set("query", query);
        }

        router.push(`${pathname}?${params.toString()}`);
    }

    function handleClearQuery() {
        const next = "";
        updateSearchParams("query", next)
        handleSearchWithQuery(next);
    }

    return (
        <div className='w-full sm:my-5 flex flex-col justify-center items-start'>
            <div className='w-full flex flex-col items-center'>
                <div className='h-18.5 w-full justify-center'>
                    <div className='relative max-w-150 left-1/2 top-0 -translate-x-1/2 z-5 flex flex-col justify-start items-center rounded-xl w-full'>
                        <SearchBar onFilterClick={() => setOpen((prev) => !prev)} isOpen={open} searchParams={searchParams} onSearchClick={handleQuerySearchButton} onQueryChange={(query) => updateSearchParams("query", query)} handleClearQuery={handleClearQuery} />
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

                {(searchParams.ingredient_names.length >= 1 && searchParams.ingredient_names[0] !== "") &&
                    <div className='mt-3 flex flex-col gap-1'>
                        {/* <p className='text-sm text-primary'>Selected Ingredients</p> */}
                        <ul className=' flex gap-2'>
                            {searchParams.ingredient_names.map((item, index) => (
                                <Tag key={index}
                                    size='small'
                                    color='sage'
                                >{item}</Tag>
                            ))}

                        </ul>
                    </div>
                }

            </div>

        </div>
    );
}
