"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PaginatedResult, RecipeListType } from "@/types/general";
import RecipeList from "@/components/recipe/RecipeList";

import type { RecipeListItem } from "@/types/recipe";
import RecipeListSkeleton from "@/components/recipe/RecipeListSkeleton";

type RecipeListClientProps = {
    initialRecipes: RecipeListItem[];
    initialNextCursor: string | null;
    initialHasMore: boolean;
    categoryIds?: string[];
    getUrl: string;
    mode: RecipeListType;
};

export default function RecipeListClient({
    initialRecipes,
    initialNextCursor,
    initialHasMore,
    categoryIds = [],
    getUrl = "",
    mode,
}: RecipeListClientProps) {

    const [recipes, setRecipes] = useState(initialRecipes);
    const [nextCursor, setNextCursor] = useState<string | null>(initialNextCursor);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);

    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null); // used as marker for interactionObserver

    const queryStringBase = useMemo(() => {
        const params = new URLSearchParams();

        for (const categoryId of categoryIds) {
            if (categoryId) params.append("categoryIds", categoryId);
        }

        return params;
    }, [categoryIds]);

    const handleLoadMore = useCallback(async () => {
        if (!nextCursor || loading || !hasMore) return;

        setLoading(true);

        try {
            const params = new URLSearchParams(queryStringBase);
            params.set("cursor", nextCursor);

            const response = await fetch(`${getUrl}?${params.toString()}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("Failed to load more recipes.");
            }

            const data: PaginatedResult<RecipeListItem> = await response.json();

            setRecipes((prev) => [...prev, ...data.items]);
            setNextCursor(data.nextCursor);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [nextCursor, loading, hasMore, queryStringBase]);

    useEffect(() => {
        const node = sentinelRef.current;
        if (!node) return;

        observerRef.current?.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry?.isIntersecting) {
                    handleLoadMore();
                }
            },
            {
                root: null,
                rootMargin: "300px",
                threshold: 0,
            }
        );

        observerRef.current.observe(node);

        return () => {
            observerRef.current?.disconnect();
        };
    }, [handleLoadMore]);

    return (
        <>
            <RecipeList recipes={recipes} type={mode} />

            {loading && <RecipeListSkeleton count={8} />}

            {hasMore && <div ref={sentinelRef} className="h-10 w-full" aria-hidden="true" />}
        </>
    );
}