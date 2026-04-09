"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import InputWrapper from "./InputWrapper";

type SelectItem = {
    id: string;
    name: string;
};

type InputSelectSearchableProps<
    TDraft,
    K extends keyof TDraft,
    TItem extends SelectItem
> = {
    items: TItem[];
    labelName?: string;
    field: K;
    name?: string;
    draftValue?: string;
    updateDraftValue: (field: K, value: string) => void;
    customClass?: string;
    addButton?: ReactNode;
    error?: string;
    placeholder?: string;
    searchPlaceholder?: string;
};

export default function InputSelectSearchable<
    TDraft,
    K extends keyof TDraft,
    TItem extends SelectItem
>({
    items,
    labelName,
    field,
    name,
    draftValue,
    updateDraftValue,
    customClass = "",
    addButton,
    error,
    placeholder = "Select an option...",
    searchPlaceholder = "Search...",
}: InputSelectSearchableProps<TDraft, K, TItem>) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const selectedItem = useMemo(() => {
        return items.find((item) => item.id === draftValue);
    }, [items, draftValue]);

    const filteredItems = useMemo(() => {
        const normalized = search.trim().toLowerCase();

        if (!normalized) return items;

        return items.filter((item) =>
            item.name.toLowerCase().includes(normalized)
        );
    }, [items, search]);

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
        setSearch("");

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    function handleClose() {
        setOpen(false);
        setSearch("");
    }

    function handleSelect(value: string) {
        updateDraftValue(field, value);
        handleClose();
    }

    return (
        <InputWrapper
            labelName={labelName}
            customClass={customClass}
            error={error}
        >
            <div ref={wrapperRef} className={`relative w-full ${customClass}`}>
                <input
                    type="hidden"
                    name={String(name ?? field)}
                    value={draftValue ?? ""}
                />

                <button
                    type="button"
                    onClick={() => (open ? handleClose() : handleOpen())}
                    className="block h-10 w-full rounded-lg border border-gray-500 bg-white p-2 text-left text-text overflow-clip"
                >
                    {selectedItem?.name ?? placeholder}
                </button>

                {open && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-50 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
                        
                        {addButton}

                        <div className="border-b border-gray-200 p-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="block h-10 w-full rounded-lg border border-gray-300 bg-white p-2 text-text outline-none"
                            />
                        </div>

                        <ul className="max-h-60 overflow-y-auto">
                            {filteredItems.length === 0 ? (
                                <li className="px-3 py-2 text-sm text-text-light">
                                    No results found
                                </li>
                            ) : (
                                filteredItems.map((item) => {
                                    const isSelected = item.id === draftValue;

                                    return (
                                        <li key={item.id}>
                                            <button
                                                type="button"
                                                onClick={() => handleSelect(item.id)}
                                                className={`w-full px-3 py-2 text-left hover:bg-gray-300 ${isSelected
                                                        ? "bg-gray-100 font-medium"
                                                        : ""
                                                    }`}
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </InputWrapper>
    );
}