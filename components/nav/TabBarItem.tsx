"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type TabBarItemProps = {
    href: string;
    text: string;
    children?: React.ReactNode;
};

export default function TabBarItem({ children, href, text }: TabBarItemProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category");
    const [baseHref, queryString] = href.split("?");
    const hrefCategory = queryString
        ? new URLSearchParams(queryString).get("category")
        : null;

    let isActive = false;

    if (hrefCategory !== null) {
        isActive =
            pathname === baseHref &&
            currentCategory?.trim().toLowerCase() === hrefCategory.trim().toLowerCase();
    } else {
        isActive = pathname === baseHref && !currentCategory;
    }

    return (
        <Link
            href={href}
            className="px-1 py-2 text-sm whitespace-nowrap"
        >
            {children}
            <p className={`py-2 px-3 ${isActive ? "text-text bg-green-300 rounded-full" : "text-green-400"} transition-colors hover:text-text hover:bg-green-300 rounded-full`}>
                {text}
            </p>
        </Link>
    );
}