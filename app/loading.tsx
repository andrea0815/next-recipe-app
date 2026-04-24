
export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-greay-100">
            <div className="flex flex-col items-center gap-4">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />

                <p className="text-sm font-medium text-text">
                    Loading Recipeez...
                </p>
            </div>
        </div>
    );
}
