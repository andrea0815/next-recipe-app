export default function Loading() {
    return (
        <div className="flex flex-col gap-6">
            <div className="h-10 w-40 rounded-xl bg-gray-200 animate-pulse" />

            <ul className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <li
                        key={index}
                        className="p-3 bg-section rounded-2xl text-text"
                    >
                        <div className="flex flex-col h-full">
                            <div className="relative aspect-square rounded-xl bg-gray-200 animate-pulse" />
                            <div className="mt-2 flex gap-2">
                                <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
                                <div className="h-6 w-20 rounded-full bg-gray-200 animate-pulse" />
                            </div>
                            <div className="mt-3 h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
                            <div className="mt-2 h-4 w-full rounded bg-gray-200 animate-pulse" />
                            <div className="mt-1 h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}