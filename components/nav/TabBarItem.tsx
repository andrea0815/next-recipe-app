"use client";
import Link from 'next/link';
import { usePathname } from "next/navigation";

type TabBarItemProps = {
    children: any,
    href: string
}

export default function TabBarItem({ children, href }: TabBarItemProps) {

    const pathname = usePathname();

    const isActive = pathname === href;
    return (
        <Link href={href} className={`px-4 ${isActive ? "text-text" : "text-text-light"} `}>
            {children}
        </Link>
    );
}
