"use client";

import imageCompression from "browser-image-compression";

import { useState } from "react";
import Button from "../buttons/Button";
import { showErrorToast } from "../general/ToastProvider";
import IconClose from "../icons/IconClose";
import IconArrowUp from "../icons/IconArrowUp";
import IconAdd from "../icons/IconAdd";
import ConfirmAction from "../errors/ConfirmaAction";

export default function ImageUpload<TDraft, K extends keyof TDraft>({
    draftValue,
    field,
    updateDraftValue,
}: {
    draftValue: string | null;
    field: K;
    updateDraftValue: (field: K, value: string) => void;
}) {
    const [compressedFile, setCompressedFile] = useState<File | null>(null);
    const [url, setUrl] = useState<string | null>(
        draftValue || draftValue !== "" ? draftValue : null
    );
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const placeholderUrl = "/image/placeholder.png"

    async function selectImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        const compressed = await imageCompression(file, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1600,
            useWebWorker: true,
        });

        setCompressedFile(compressed);
        setSelectedFileName(compressed.name);
    }

    async function handleUpload() {
        if (!compressedFile) return;

        const formData = new FormData();
        formData.append("file", compressedFile);

        const res = await fetch("/api/upload-image", {
            method: "POST",
            body: formData,
        });

        const text = await res.text();

        let data: { url?: string; error?: string } | null = null;

        try {
            data = text ? JSON.parse(text) : null;
        } catch {
            data = null;
        }

        if (!res.ok || !data?.url) {
            showErrorToast(data?.error ?? "Upload failed");
            return;
        }

        setUrl(data.url);
        setCompressedFile(null);
        setSelectedFileName(null);
        updateDraftValue(field, data.url);
    }

    function removeImage() {
        setUrl(null);
        setCompressedFile(null);
        setSelectedFileName(null);
        updateDraftValue(field, "");
    }

    return (<>

        <div className="flex flex-col gap-6 sm:flex-row justify-between sm:items-center">
            <h2 className='text-xl font-semibold'>Image</h2>
            <div className="flex gap-2">
                {url ? (
                    <>
                        <ConfirmAction
                            title="Remove this image?"
                            description="This action cannot be undone."
                            confirmText="Delete"
                            onConfirm={removeImage}
                            trigger={(openConfirm) => (
                                <Button
                                    onClick={openConfirm}
                                    priority="secondary"
                                    size="small"
                                >
                                    <IconClose /> Remove image
                                </Button>
                            )}
                        />
                    </>
                ) : (
                    <Button
                        onClick={handleUpload}
                        disabled={!compressedFile}
                        priority="secondary"
                        size="small"
                    >
                        <IconArrowUp /> Upload Image
                    </Button>
                )}
            </div>

        </div>

        <div className="flex flex-col gap-4 items-center">
            <input
                id="recipe-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={selectImage}
                disabled={!!url}
            />

            <input
                type="hidden"
                readOnly
                value={draftValue?.toString() ?? placeholderUrl}
                name={field.toString()}
            />

            <label
                htmlFor="recipe-image"
                className="w-full flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-500 px-6 py-6 text-center transition hover:bg-gray-300 active:scale-[0.99] disabled:cursor-none"
            >
                {!url && <>
                    <span className="text-base font-semibold text-gray-800 flex gap-2 items-">
                        <IconAdd /> Choose image
                    </span>

                    <span className="mt-1 text-sm text-gray-700">
                        Click to upload a recipe photo
                    </span>

                    {selectedFileName && (
                        <span className="mt-3 max-w-full truncate rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            Selected: {selectedFileName}
                        </span>
                    )}
                </>}

                {!selectedFileName && url && (
                    <img
                        className="h-full max-w-full"
                        src={url} alt="" />
                )}
            </label>


        </div>
    </>
    );
}