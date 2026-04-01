import Link from 'next/link';
import React from 'react';

type TagProps = {
    children: any,
    color?: string,
    title?: string,
    stretch?: boolean,
    disabled?: boolean,
    onClick?: () => void,
    type?: "button" | "submit" | "reset";
    priority?: "primary" | "secondary" | "tertiary";
    size?: "big" | "medium" | "small";
    href?: string | null;
    customClass?: string;
    isInverted?: boolean;
}

export default function Tag({
    children,
    color = "primary",
    title = "",
    onClick,
    type = "button",
    stretch = false,
    disabled = false,
    size = "small",
    priority = "primary",
    href = "",
    customClass = "",
    isInverted = false,
}
    : TagProps) {

    const sizeClasses = {
        big: "px-5 py-3 text-lg ",
        medium: "px-4 py-2",
        small: "px-3 py-1 text-sm"
    }

    const colorClasses = {
        primary: `bg-${isInverted ? 'white' : color} text-${isInverted ? color : 'white'} `,
        secondary: `text-${color} bg-transparent border-2 border-${color} `,
        tertiary: `text-${color} fill-${color} stroke-${color} bg-transparent underline underline-offset-4`,
    }

    const selectedSizeClasses = sizeClasses[size] || sizeClasses.medium;
    const selectedPriorityClasses = colorClasses[priority] || colorClasses.primary;

    return (
        href === "" && onClick === undefined ? (
            <span
                className={`${selectedPriorityClasses} ${selectedSizeClasses} ${stretch ? "w-full" : ""} rounded-full transition-all cursor-pointer ${disabled ? "opacity-50" : ""} ${customClass}`}
            >
                {children}
            </span>

        ) : (
            href === "" ? (
                <button
                    onClick={onClick}
                    type={type}
                    title={title}
                    disabled={disabled}
                    className={`${selectedPriorityClasses} ${selectedSizeClasses} ${stretch ? "w-full" : ""} transition-all cursor-pointer ${disabled ? "opacity-50" : ""} ${customClass}`}>
                    {children}
                </button>
            ) : (
                <Link
                    href={href ? href : ""}
                    onClick={onClick}
                    className={`${selectedPriorityClasses} ${selectedSizeClasses} ${stretch ? "w-full" : ""} transition-all cursor-pointer ${disabled ? "opacity-50" : ""} ${customClass}`}>
                    {children}
                </Link>
            ))
    );
}
