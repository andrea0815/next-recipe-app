"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type TabBarItemProps = {
    href?: string;
    text: string;
    children?: React.ReactNode;
    onClick?: () => void;
    isActive?: boolean;
};

export default function TabBarItem({
    children,
    href,
    text,
    onClick,
    isActive: forcedIsActive,
}: TabBarItemProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    let isActive = forcedIsActive ?? false;

    if (href) {
        const currentCategory = searchParams.get("category");
        const [baseHref, queryString] = href.split("?");
        const hrefCategory = queryString
            ? new URLSearchParams(queryString).get("category")
            : null;

        if (hrefCategory !== null) {
            isActive =
                pathname === baseHref &&
                currentCategory?.trim().toLowerCase() === hrefCategory.trim().toLowerCase();
        } else {
            isActive = pathname === baseHref && !currentCategory;
        }
    }

    const inner = (
        <>
            {children}
            <p
                className={`py-2 px-3 ${
                    isActive
                        ? "text-text bg-green-300 rounded-full"
                        : "text-green-400"
                } flex justify-center items-center transition-colors h-8 hover:text-text hover:bg-green-300 rounded-full`}
            >
                {text}
            </p>
        </>
    );

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className="px-1 py-2 text-sm whitespace-nowrap cursor-pointer"
            >
                {inner}
            </button>
        );
    }

    return (
        <Link
            href={href ?? ""}
            scroll={false}
            className="px-1 py-2 text-sm whitespace-nowrap cursor-pointer"
        >
            {inner}
        </Link>
    );
}