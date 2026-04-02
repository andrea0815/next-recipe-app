"use client";

type ErrorDialogProps = {
    open: boolean;
    message: string;
    onClose: () => void;
};

export default function ErrorDialog({
    open,
    message,
    onClose,
}: ErrorDialogProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-xs ">
            <div className="w-1/2 max-w-md rounded-2xl p-10 shadow-xl text-center bg-gray-100">
                <h2 className="mb-3 text-2xl font-bold text-red-800">
                    Could not delete item
                </h2>

                <p className="mb-5 text-sm text-text">{message}</p>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded bg-text px-4 py-2 text-greay-100 pointer"
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );
}