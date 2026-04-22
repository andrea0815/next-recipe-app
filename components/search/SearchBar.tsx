import { SearchParams } from "@/types/search";
import Button from "../buttons/Button";
import IconFilter from "../icons/IconFilter";
import IconSearch from "../icons/IconSearch";
import IconClose from "../icons/IconClose";

export default function SearchBar({
    isOpen,
    searchParams,
    onFilterClick,
    onQueryChange,
    onSearchClick,
    handleClearQuery
}: {
    isOpen: boolean;
    searchParams: SearchParams;
    onFilterClick: () => void;
    onQueryChange: (query: string) => void;
    onSearchClick: () => void;
    handleClearQuery: () => void;
}) {

    return (
        <div className="flex gap-2 w-full sm:py-3 sm:px-3 p-2">

            <div className="relative w-full">
                <input
                    type="text"
                    value={searchParams.query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className="bg-white w-full h-(--btn-h-md) px-4 py-3 pr-10 rounded-lg transition-all"
                    placeholder="Search …"
                />

                {searchParams.query !== "" && (
                    <button
                        type="button"
                        onClick={() => handleClearQuery()}
                        className="absolute right-12 top-1/2 -translate-y-1/2 rounded-lg text-gray-500 bg-transparent hover:bg-gray-300 cursor-pointer p-2 transition-colors"
                        aria-label="Clear search"
                    >
                        <IconClose />
                    </button>
                )}

                <button
                    onClick={onSearchClick}
                    disabled={searchParams.query === ""}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg text-primary bg-transparent hover:bg-gray-300 cursor-pointer p-2 transition-colors"
                >
                    <IconSearch />
                </button>
            </div>



            <Button
                priority={searchParams.ingredient_names.length === 0 ? "secondary" : "primary"}
                onClick={onFilterClick}
                isIcon={true}
            >
                {isOpen ? <IconClose /> : <IconFilter />}

            </Button>
        </div>
    );
}