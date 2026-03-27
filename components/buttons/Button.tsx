import React from 'react';

type ButtonProps = {
    children: any,
    bgColor?: string,
    textColor?: string,
    stretch?: boolean,
    onClick?: () => void,
    type?: "button" | "submit" | "reset";
}

export default function Button({ children, bgColor = "primary", textColor = "white", onClick, type = "button", stretch = false }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`text-${textColor} ${stretch ? "w-full" : ""} rounded-md px-4 py-3 cursor-pointer bg-${bgColor}`}>
            {children}
        </button>
    );
}
