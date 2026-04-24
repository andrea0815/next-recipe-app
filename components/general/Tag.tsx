import Link from 'next/link';
import React from 'react';

type TagProps = {
    children: any,
    color?: "primary" | "red" | "gray" | "white" | "sage",
    title?: string,
    stretch?: boolean,
    onClick?: () => void,
    type?: "button" | "submit" | "reset";
    priority?: "primary" | "secondary" | "tertiary";
    size?: "big" | "medium" | "small";
    href?: string | null;
    customClass?: string;
}

export default function Tag({
    children,
    color = "primary",
    title = "",
    onClick,
    type = "button",
    stretch = false,
    size = "small",
    priority = "primary",
    href = "",
    customClass = "",
}
    : TagProps) {

    const isClickable = href !== "" || !!onClick;

    const colorToneClasses = {
        primary: {
            solid: `bg-primary text-white border-primary border-2 ${isClickable ? "hover:bg-primaryOn" : ""}`,
            outline: `text-primary bg-transparent border-2 border-primary  ${isClickable ? "hover:bg-primary hover:text-white" : ""}`,
            ghost: `text-primary fill-primary stroke-primary bg-transparent ${isClickable ? "hover:text-primaryOn" : ""}`,
        },
        red: {
            solid: `bg-red text-white border-red border-2 ${isClickable ? "hover:bg-redOn" : ""}`,
            outline: `text-red bg-transparent border-2 border-red ${isClickable ? "hover:bg-red hover:text-white" : ""}`,
            ghost: `text-red fill-red stroke-red bg-transparent${isClickable ? "hover:text-redOn" : ""}`,
        },
        white: {
            solid: `bg-white text-text border-white border-2 ${isClickable ? "hover:bg-gray-300 hover:border-gray-300" : ""}`,
            outline: `text-white bg-transparent border-2 border-white ${isClickable ? "hover:bg-gray-300 hover:border-gray-300 hover:text-text" : ""}`,
            ghost: `text-white fill-white stroke-white bg-transparent ${isClickable ? "hover:text-gray-300" : ""}`,
        },
        gray: {
            solid: `bg-gray-500 text-white border-gray-500 border-2 ${isClickable ? "hover:bg-gray-800" : ""}`,
            outline: `text-gray-500 bg-transparent border-2 border-gray-500 ${isClickable ? "hover:bg-gray-500 hover:text-white" : ""}`,
            ghost: `text-gray-500 fill-gray-500 stroke-gray-500 bg-transparent ${isClickable ? "hover:text-gray-800" : ""}`,
        },
        sage: {
            solid: `bg-green-300 text-text border-green-300 border-2 ${isClickable ? "hover:bg-green-400" : ""}`,
            outline: `text-green-300 bg-transparent border-2 border-green-300 ${isClickable ? "hover:bg-green-300 hover:text-white" : ""}`,
            ghost: `text-green-300 fill-green-300 stroke-green-300 bg-transparent ${isClickable ? "hover:text-green-800" : ""}`,
        },
    } as const;

    const sizeClasses = {
        big: `text-md rounded-full px-6 py-3`,
        medium: `text-sm rounded-full px-3 py-1`,
        small: `text-sm rounded-full px-2`,
    } as const;

    const priorityKeyMap = {
        primary: "solid",
        secondary: "outline",
        tertiary: "ghost",
    } as const;

    const selectedColor = colorToneClasses[color] ?? colorToneClasses.primary;
    const selectedSize = sizeClasses[size] ?? sizeClasses.medium;
    const selectedPriority = selectedColor[priorityKeyMap[priority] ?? "solid"];

    const className = [
        selectedPriority,
        selectedSize,
        `transition-all text-center whitespace-nowrap flex justify-center items-center gap-2 ${stretch ? "w-full" : ""} ${customClass}`,
    ].join(" ");

    return (
        href === "" && onClick === undefined ? (
            <span
                title={title}
                className={className}
            >
                {children}
            </span>

        ) : (
            href === "" ? (
                <button
                    onClick={onClick}
                    type={type}
                    title={title}
                    className={className + "cursor-pointer"}>
                    {children}
                </button>
            ) : (
                <Link
                    href={href ? href : ""}
                    title={title}
                    {...(onClick ? { onClick } : {})}
                    className={className + " cursor-pointer"}
                    scroll={true}
                >
                    {children}
                </Link>
            ))
    );
}
