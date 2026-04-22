"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import type { Ingredient } from "@/types/ingredient";
import type { SearchParams } from "@/types/search";

import SearchBar from "./SearchBar";
import SearchPanelContent from "./SearchPanelContent";
import Tag from "../general/Tag";

export default function SearchPanel({
    ingredients,
}: {
    ingredients: Ingredient[];
}) {
    const pathname = usePathname();
    const params = useSearchParams();

    const category = params.get("category");
    const query = params.get("query");
    const ingredientNames = params.getAll("ingredients");

    const initialSearchParams = {
        query: query ?? "",
        category: category ?? "",
        ingredient_names: ingredientNames ?? [],
    };

    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useState<SearchParams>(initialSearchParams);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setSearchParams({
            query: query ?? "",
            category: category ?? "",
            ingredient_names: ingredientNames ?? [],
        });
        setOpen(false);
    }, [category, query, ingredientNames.join(",")]);

    function updateUrl(nextParams: URLSearchParams) {
        const queryString = nextParams.toString();
        const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
        window.history.pushState(null, "", nextUrl);
    }

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
        const nextParams = new URLSearchParams();

        setOpen(false);
        updateUrl(nextParams);

        setSearchParams({
            query: "",
            category: "",
            ingredient_names: [],
        });
    }

    function handleSearchButton() {
        const nextParams = new URLSearchParams();

        if (searchParams.query?.trim()) {
            nextParams.set("query", searchParams.query.trim());
        }

        if (searchParams.category?.trim()) {
            nextParams.set("category", searchParams.category.trim());
        }

        for (const ingredientName of searchParams.ingredient_names) {
            nextParams.append("ingredients", ingredientName);
        }

        setOpen(false);
        updateUrl(nextParams);
    }

    function handleQuerySearchButton() {
        const nextParams = new URLSearchParams();

        if (searchParams.query?.trim()) {
            nextParams.set("query", searchParams.query.trim());
        }

        if (searchParams.category?.trim()) {
            nextParams.set("category", searchParams.category.trim());
        }

        for (const ingredientName of searchParams.ingredient_names) {
            nextParams.append("ingredients", ingredientName);
        }

        setOpen(false);
        updateUrl(nextParams);
    }

    function handleSearchWithQuery(nextQuery: string) {
        const nextParams = new URLSearchParams(params.toString());

        if (nextQuery.trim()) {
            nextParams.set("query", nextQuery.trim());
        } else {
            nextParams.delete("query");
        }

        nextParams.delete("cursor");
        updateUrl(nextParams);
    }

    function handleClearQuery() {
        const next = "";
        updateSearchParams("query", next);
        handleSearchWithQuery(next);
    }

    return (
        <div className="w-full sm:my-5 flex flex-col justify-center items-center">
            <div className="w-full flex max-w-150 flex-col items-center justify-center">
                <div className="h-18.5 w-full justify-center">
                    <div
                        ref={containerRef}
                        className="sticky top-0 z-5 flex flex-col justify-start items-center rounded-xl w-full"
                    >
                        <SearchBar
                            onFilterClick={() => setOpen((prev) => !prev)}
                            isOpen={open}
                            searchParams={searchParams}
                            onSearchClick={handleQuerySearchButton}
                            onQueryChange={(value) => updateSearchParams("query", value)}
                            handleClearQuery={handleClearQuery}
                        />

                        <SearchPanelContent
                            isOpen={open}
                            ingredients={ingredients}
                            selectedIngredients={searchParams.ingredient_names}
                            onSearchButton={handleSearchButton}
                            onClearButton={handleClearButton}
                            onIngredientsChange={(names) =>
                                updateSearchParams("ingredient_names", names)
                            }
                        />

                        <div className="absolute inset-0 -z-10 backdrop-blur-sm bg-section-50 rounded-xl" />
                    </div>
                </div>

                {ingredientNames.length >= 1 && (
                    <div className="mt-3 flex flex-col gap-1">
                        <ul className="flex gap-2">
                            {ingredientNames.map((item, index) => (
                                <Tag key={index} size="medium" color="sage">
                                    {item}
                                </Tag>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}