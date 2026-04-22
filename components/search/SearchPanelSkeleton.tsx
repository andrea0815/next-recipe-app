"use client"

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import type { Ingredient } from '@/types/ingredient';
import type { SearchParams } from '@/types/search';

import SearchBar from './SearchBar';
import SearchPanelContent from './SearchPanelContent';
import Tag from '../general/Tag';

export default function SearchPanelSkeleton() {

    return (
        <div className='w-full sm:my-5 flex flex-col justify-center items-center'>
            <div className='w-full flex max-w-150 flex-col items-center justify-center'>
                <div className='h-18.5 w-full justify-center'>
                    <div className='sticky top-0  z-5 flex flex-col justify-start items-center rounded-xl w-full'>
                        <SearchBar onFilterClick={() => null} isOpen={false} searchParams={{ query: "", ingredient_names: [], category: "" }} onSearchClick={() => null} onQueryChange={() => null} handleClearQuery={() => null} />
                        <SearchPanelContent
                            isOpen={false}
                            ingredients={[]}
                            selectedIngredients={[]}
                            onSearchButton={() => null}
                            onClearButton={() => null}
                            onIngredientsChange={() => () => null}
                        />
                        <div className="absolute inset-0 -z-10 backdrop-blur-sm bg-section-50 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
