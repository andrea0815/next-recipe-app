"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { PaginatedResult, RecipeListType } from "@/types/general";
import RecipeList from "@/components/recipe/RecipeList";
import RecipeListSkeleton from "@/components/recipe/RecipeListSkeleton";

import type { RecipeListItem } from "@/types/recipe";

type RecipeListClientProps = {
    getUrl: string;
    mode: RecipeListType;
};

export default function RecipeListClient({
    getUrl,
    mode,
}: RecipeListClientProps) {
    const searchParams = useSearchParams();

    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const requestIdRef = useRef(0);

    const [recipes, setRecipes] = useState<RecipeListItem[]>([]);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);

    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const paramsString = searchParams.toString();

    const queryStringBase = useMemo(() => {
        const params = new URLSearchParams(paramsString);

        params.delete("cursor");

        return params.toString();
    }, [paramsString]);

    const loadInitial = useCallback(async () => {
        const currentRequestId = ++requestIdRef.current;
        setLoadingInitial(true);

        try {
            const response = await fetch(`${getUrl}?${queryStringBase}`, {
                method: "GET",
                cache: "no-store",
            });

            console.log(response);

            if (!response.ok) {
                throw new Error("Failed to load recipes.");
            }

            const data: PaginatedResult<RecipeListItem> = await response.json();

            if (requestIdRef.current !== currentRequestId) return;

            setRecipes(data.items);
            setNextCursor(data.nextCursor);
            setHasMore(data.hasMore);
        } catch (error) {
            if (requestIdRef.current !== currentRequestId) return;

            console.error(error);
            setRecipes([]);
            setNextCursor(null);
            setHasMore(false);
        } finally {
            if (requestIdRef.current === currentRequestId) {
                setLoadingInitial(false);
            }
        }
    }, [getUrl, queryStringBase]);

    const handleLoadMore = useCallback(async () => {
        if (!nextCursor || loadingMore || !hasMore || loadingInitial) return;

        setLoadingMore(true);

        try {
            const params = new URLSearchParams(queryStringBase);
            params.set("cursor", nextCursor);

            const response = await fetch(`${getUrl}?${params.toString()}`, {
                method: "GET",
                cache: "no-store",
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
            setLoadingMore(false);
        }
    }, [nextCursor, loadingMore, hasMore, loadingInitial, queryStringBase, getUrl]);

    useEffect(() => {
        setRecipes([]);
        setNextCursor(null);
        setHasMore(false);
        loadInitial();
    }, [loadInitial]);

    useEffect(() => {
        const node = sentinelRef.current;
        if (!node || loadingInitial || !hasMore) return;

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
    }, [handleLoadMore, loadingInitial, hasMore]);

    if (loadingInitial) {
        return <RecipeListSkeleton count={8} />;
    }

    return (
        <>
            <RecipeList recipes={recipes} type={mode} />

            {loadingMore && <RecipeListSkeleton count={4} />}

            {hasMore && (
                <div
                    ref={sentinelRef}
                    className="h-10 w-full"
                    aria-hidden="true"
                />
            )}
        </>
    );
}