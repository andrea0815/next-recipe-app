import Link from 'next/link';
import React from 'react';

type ButtonProps = {
    text: string
    link: string,
    bgColor?: "primary" | "red" | "green",
    textColor?: string,
    stretch?: boolean,
    isPrimary?: boolean,
}

export default function Button({ text, bgColor = "primary", link, textColor = "white", stretch = false, isPrimary = true }: ButtonProps) {
    return (
        <Link
            href={link}
            className={isPrimary
                ? `text-white ${stretch ? "w-full" : ""} rounded-md px-4 py-3 text-center cursor-pointer bg-${bgColor} hover:bg-text-light transition`
                : `text-text ${stretch ? "w-full" : ""} rounded-md border-2 border-${bgColor} px-4 py-3 text-center cursor-pointer bg-transparent hover:bg-light transition`
            }
        >
            {text}
        </Link>
    );
}
