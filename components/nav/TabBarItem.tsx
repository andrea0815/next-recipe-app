"use client";
import Link from 'next/link';
import { usePathname, useSearchParams } from "next/navigation";

type TabBarItemProps = {
    children?: any,
    href: string
    text: string
}

export default function TabBarItem({ children, href, text }: TabBarItemProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const category = searchParams.get("category") ?? "All";

    const baseHref = href.split("?")[0];

    const isActive =
        pathname.startsWith(baseHref) &&
        (category
            ? category.toLowerCase().trim() === text.toLowerCase().trim()
            : true);

    return (
        <Link
            href={href}
            className={`px-4 py-4 flex flex-col justify-center items-center gap-1 text-sm whitespace-nowrap ${isActive ? "text-text" : "text-text-light"
                }`}
        >
            <p>{text}</p>
        </Link>
    );
}
