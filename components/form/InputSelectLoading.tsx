"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import InputWrapper from "./InputWrapper";
import IconArrowDown from "../icons/IconArrowDown";
import IconSpinner from "../icons/IconSpinner";

type InputSelectLoadingProps = {
    labelName?: string;
    customClass?: string;
    placeholder?: string;
};

export default function InputSelectLoading({
    labelName,
    customClass = "",
    placeholder
}: InputSelectLoadingProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setOpen(false);
                setSearch("");
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    function handleOpen() {
        setOpen(true);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    return (
        <InputWrapper
            {...(labelName !== undefined ? { labelName } : {})}
            {...(customClass !== undefined ? { customClass } : {})}
        >
            <div ref={wrapperRef} className={`relative w-full ${customClass}`}>
                <button
                    type="button"
                    onClick={() => (open ? setOpen(false) : handleOpen())}
                    className="block group relative w-full h-10 p-2 bg-white text-text rounded-lg border border-gray-500 text-left cursor-pointer truncate"
                >
                    {placeholder}
                    <div
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg text-gray-500 bg-transparent group-hover:bg-gray-200 cursor-pointer p-1 transition-colors"
                    >
                       <IconSpinner />
                    </div>
                </button>
            </div>
        </InputWrapper>
    );
}