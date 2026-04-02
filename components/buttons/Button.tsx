import Link from 'next/link';
import React from 'react';

type ButtonProps = {
    children: any,
    color?: string,
    title?: string,
    stretch?: boolean,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type?: "button" | "submit" | "reset";
    priority?: "primary" | "secondary" | "tertiary";
    size?: "big" | "medium" | "small";
    href?: string | null;
    customClass?: string;
}

export default function Button({
    children,
    color = "primary",
    title = "",
    onClick,
    type = "button",
    stretch = false,
    disabled = false,
    size = "medium",
    priority = "primary",
    href = "",
    customClass = "",
}
    : ButtonProps) {

    const sizeClasses = {
        big: "px-6 py-4 text-lg rounded-xl",
        medium: "px-4 py-3 rounded-lg",
        small: "px-3 py-2 text-sm rounded-md"
    }

    const colorClasses = {
        primary: `bg-${color} text-white`,
        secondary: `text-${color} bg-transparent border-2 border-${color} `,
        tertiary: `text-${color} fill-${color} stroke-${color} bg-transparent underline underline-offset-4`,
    }

    const selectedSizeClasses = sizeClasses[size] || sizeClasses.medium;
    const selectedPriorityClasses = colorClasses[priority] || colorClasses.primary;

    return (
        href === "" ? (
            <button
                onClick={onClick}
                type={type}
                title={title}
                disabled={disabled}
                className={`${selectedPriorityClasses} ${selectedSizeClasses} ${stretch ? "w-full" : ""} transition-all text-center ${disabled ? "opacity-30" : "cursor-pointer"} ${customClass}`}>
                {children}
            </button>
        ) : (
            <Link
                href={href ? href : ""}
                className={`${selectedPriorityClasses} ${selectedSizeClasses} ${stretch ? "w-full" : ""} transition-all text-center ${disabled ? "opacity-30" : "cursor-pointer"} ${customClass}`}>
                {children}
            </Link>
        )
    );
}
