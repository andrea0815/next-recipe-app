import React from 'react';

type ButtonProps = {
    text: string
    bgColor?: string,
    onClick?: () => void,
    type?: string
}

export default function Button({ text, bgColor = "primary", onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`text-white rounded-md px-4 py-2 cursor-pointer bg-${bgColor}-500`}>
            {text}
        </button>
    );
}
