"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { showSuccessToast } from "@/components/general/ToastProvider";

export default function RecipeToastHandler() {
    const searchParams = useSearchParams();
    const shownRef = useRef(false);

    useEffect(() => {
        const toast = searchParams.get("toast");
        if (!toast || shownRef.current) return;

        if (
            toast === "recipe-created" ||
            toast === "recipe-updated" ||
            toast === "recipe-deleted"
        ) {
            shownRef.current = true;

            const toastText =
                toast === "recipe-created"
                    ? "Recipe created successfully"
                    : toast === "recipe-updated"
                        ? "Recipe updated successfully"
                        : "Recipe deleted successfully";

            showSuccessToast(toastText);

            const params = new URLSearchParams(searchParams.toString());
            params.delete("toast");

            const nextUrl = params.toString()
                ? `${window.location.pathname}?${params.toString()}`
                : window.location.pathname;

            window.history.replaceState({}, "", nextUrl);
        }
    }, [searchParams]);

    return null;
}