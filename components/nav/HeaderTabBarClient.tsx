"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

import type { Category } from "@/types/category";
import { RecipeListType } from "@/types/general";

import HeaderSectionWrapper from "../containers/HeaderSectionWrapper";
import TabBar from "@/components/nav/TabBar";
import TabBarItem from "@/components/nav/TabBarItem";

type HeaderTabBarClientProps = {
    categories: Category[];
    type: RecipeListType;
};

export default function HeaderTabBarClient({
    categories,
    type,
}: HeaderTabBarClientProps) {
    const searchParams = useSearchParams();

    const activeCategory = searchParams.get("category") ?? "";
    const baseRoot = type === RecipeListType.COLLECTION ? "/collection" : "/explore";

    const setCategory = (categoryName?: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!categoryName) {
            params.delete("category");
        } else {
            params.set("category", categoryName);
        }

        params.delete("cursor");

        const queryString = params.toString();
        const nextUrl = queryString ? `${baseRoot}?${queryString}` : baseRoot;

        window.history.pushState(null, "", nextUrl);
    };

    return (
        <HeaderSectionWrapper>
            <TabBar>
                <TabBarItem
                    text="All"
                    isActive={activeCategory === ""}
                    onClick={() => setCategory(undefined)}
                />

                {categories.map((category) => (
                    <TabBarItem
                        key={category.id}
                        text={category.name}
                        isActive={activeCategory === category.name}
                        onClick={() => setCategory(category.name)}
                    />
                ))}
            </TabBar>
        </HeaderSectionWrapper>
    );
}