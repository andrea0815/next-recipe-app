// "use client";

// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";

// type TabBarItemProps = {
//     href: string;
//     text: string;
//     children?: React.ReactNode;
// };

// export default function TabBarItem({ children, href, text }: TabBarItemProps) {
//     const pathname = usePathname();
//     const searchParams = useSearchParams();

//     const category = searchParams.get("category");

//     // extract base path (remove query from href)
//     const baseHref = href.split("?")[0];

//     const isPathActive = pathname.startsWith(baseHref);

//     // check if this tab has a category in href
//     const hrefCategory = href.includes("?category=")
//         ? href.split("category=")[1]
//         : null;

//     const isCategoryActive = hrefCategory
//         ? category?.toLowerCase().trim() === hrefCategory.toLowerCase().trim()
//         : !category; // for "All"

//     const isActive = hrefCategory
//         ? isPathActive && isCategoryActive
//         : isPathActive;

//     return (
//         <Link
//             href={href}
//             className={`px-1 py-2 text-sm whitespace-nowrap
//                 }`}
//         >
//             {children}
//             <p className={`py-2 px-3 ${isActive ? "text-text bg-gray-200 rounded-full" : "text-text-light"}`}>
//                 {text}
//             </p>
//         </Link >
//     );
// }

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

    const category = searchParams.get("category");
    const [baseHref, queryString] = href.split("?");
    const hrefCategory = queryString
        ? new URLSearchParams(queryString).get("category")
        : null;

    let isActive = false;

    if (hrefCategory !== null) {
        isActive =
            pathname === baseHref &&
            category?.trim().toLowerCase() === hrefCategory.trim().toLowerCase();
    } else if (baseHref === "/collection") {
        isActive = pathname === "/collection" && !category;
    } else {
        isActive = pathname.startsWith(baseHref);
    }

    return (
        <Link
            href={href}
            className={`px-1 py-2 text-sm whitespace-nowrap
                }`}
        >
            {children}
            <p className={`py-2 px-3 ${isActive ? "text-text bg-gray-200 rounded-full" : "text-text-light"}`}>
                {text}
            </p>
        </Link >
    );
}