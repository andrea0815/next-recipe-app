import Link from 'next/link';
import React from 'react';

type ButtonProps = {
    children: any,
    color?: "primary" | "red" | "gray" | "white",
    title?: string,
    stretch?: boolean,
    xPadding?: boolean,
    yPadding?: boolean,
    isIcon?: boolean,
    underline?: boolean,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type?: "button" | "submit" | "reset";
    priority?: "primary" | "secondary" | "tertiary";
    size?: "huge" | "big" | "medium" | "small";
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
    underline = true,
    xPadding = true,
    yPadding = true,
    isIcon = false,
    disabled = false,
    size = "medium",
    priority = "primary",
    href = "",
    customClass = "",
}
    : ButtonProps) {

    const colorToneClasses = {
        primary: {
            solid: "bg-primary text-white border-primary border-2 hover:bg-primaryOn",
            outline: "text-primary bg-transparent border-2 border-primary hover:bg-primary hover:text-white",
            ghost: "text-primary fill-primary stroke-primary bg-transparent",
        },
        red: {
            solid: "bg-red text-white border-red border-2 hover:bg-redOn",
            outline: "text-red bg-transparent border-2 border-red hover:bg-red hover:text-white",
            ghost: "text-red fill-red stroke-red bg-transparent",
        },
        white: {
            solid: "bg-white text-black border-white border-2 hover:bg-gray-400 hover:text-white",
            outline: "text-white bg-transparent border-2 border-white hover:bg-gray-400 hover:text-text",
            ghost: "text-white fill-white stroke-white bg-transparent hover:text-gray-400",
        },
        gray: {
            solid: "bg-gray-500 text-white border-gray-500 border-2",
            outline: "text-gray-500 bg-transparent border-2 border-gray-500 hover:bg-gray-500 hover:text-white",
            ghost: "text-gray-500 fill-gray-500 stroke-gray-500 bg-transparent",
        },
    } as const;

    const sizeClasses = {
        huge: `text-md rounded-xl ${xPadding ? "px-6" : ""} ${isIcon ? "w-[74px]" : ""} ${yPadding ? "h-[74px]" : ""}`,
        big: `text-md rounded-xl ${xPadding ? "px-6" : ""} ${isIcon ? "w-(--btn-h-md)" : ""} ${yPadding ? "h-(--btn-h-lg)" : ""}`,
        medium: `rounded-lg ${xPadding ? "px-4" : ""} ${isIcon ? "w-(--btn-h-md)" : ""} ${yPadding ? "h-(--btn-h-md)" : ""}`,
        small: `text-sm rounded-md ${yPadding ? "h-(--btn-h-sm)" : ""} ${isIcon ? "w-(--btn-h-md)" : ""} ${priority === "tertiary" ? "" : "px-3 py-2"}`,
    } as const;

    const priorityKeyMap = {
        primary: "solid",
        secondary: "outline",
        tertiary: "ghost",
    } as const;

    const selectedColor = colorToneClasses[color] ?? colorToneClasses.primary;
    const selectedSize = sizeClasses[size] ?? sizeClasses.medium;
    const selectedPriority = selectedColor[priorityKeyMap[priority] ?? "solid"];

    const underlineClasses =
        priority === "tertiary" && !underline
            ? "underline underline-offset-4"
            : "";

    const className = [
        selectedPriority,
        selectedSize,
        underlineClasses,
        `transition-all text-center flex shrink-0 justify-center items-center gap-2 ${stretch ? "w-full" : ""} ${disabled ? "opacity-30" : "cursor-pointer"} ${customClass}`,
    ].join(" ");

    return (
        href === "" ? (
            <button
                onClick={onClick}
                type={type}
                title={title}
                disabled={disabled}
                className={className}>
                {children}
            </button>
        ) : (
            <Link
                href={href ? href : ""}
                className={className}
                scroll={true}
            >
                {children}
            </Link>
        )
    );
}
