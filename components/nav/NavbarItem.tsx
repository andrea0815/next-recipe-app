"use client"

import Link from 'next/link';
import React, { ReactNode } from 'react';
import { usePathname } from "next/navigation";


export default function NavbarItem({
  icon,
  link,
  text,
}: {
  icon: React.ReactNode;
  link: string;
  text: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === link || pathname.startsWith(`${link}/`);

  return (
    <Link href={link}
      scroll={false}
    >
      <div
        className={`flex items-center rounded-full px-3 py-2 transition-all duration-300 ${isActive ? "bg-white" : "hover:bg-white/70"
          }`}
      >
        <div className="shrink-0">
          {icon}
        </div>

        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-700 ${isActive
              ? "max-w-40 opacity-100 translate-x-0 pl-2"
              : "max-w-0 opacity-0 ml-0 -translate-x-2 pl-0"
            }`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
}
