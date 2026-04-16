"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
    error?: string;
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
    error,
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
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    function handleSelect(value: string) {
        updateDraftValue(field, value);
        setOpen(false);
        setSearch("");
    }

    return (
        <InputWrapper
            {...(labelName !== undefined ? { labelName } : {})}
            {...(customClass !== undefined ? { customClass } : {})}
            {...(error !== undefined ? { error } : {})}
        >
            <div ref={wrapperRef} className={`relative w-full ${customClass}`}>
                <input
                    type="hidden"
                    name={String(name ?? field)}
                    value={draftValue ?? ""}
                />

                <button
                    type="button"
                    onClick={() => (open ? setOpen(false) : handleOpen())}
                    className="block w-full h-10 p-2 bg-white text-text rounded-lg border border-gray-500 text-left"
                >
                    {selectedItem?.name ?? "Select an option…"}
                </button>

                {open && (
                    <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg overflow-hidden">
                        <div className="p-2 border-b border-gray-200">
                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className="block w-full h-10 p-2 bg-white text-text rounded-lg border border-gray-300 outline-none"
                            />
                        </div>

                        <ul className="max-h-60 overflow-y-auto">
                            {filteredItems.length === 0 ? (
                                <li className="px-3 py-2 text-text-light text-sm">
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
                                                className={`w-full px-3 py-2 text-left hover:bg-gray-100 ${isSelected ? "bg-gray-100 font-medium" : ""
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