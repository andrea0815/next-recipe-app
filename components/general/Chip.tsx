import React from 'react';

type ChipProps = {
    onClick: () => void,
    text: string
    title?: string,
    color?: string
}

export default function Chip({ onClick, text, title = "Click to remove", color = "white" }: ChipProps) {
    return (
        <button
            className="px-3 py-1 rounded-full text-text border border-white/20 hover:text-primary transition cursor-pointer"
            style={{backgroundColor: color}}
            title={title}
            type="button"
            onClick={onClick}
        >
            {text} ✕
        </button >
    );
}
