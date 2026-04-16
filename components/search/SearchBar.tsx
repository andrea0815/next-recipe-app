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
        <div className="flex gap-2 w-full p-3">

            <div className="relative w-full">
                <input
                    type="text"
                    value={searchParams.query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    className="bg-white w-full px-4 py-3 pr-10 rounded-lg transition-all"
                    placeholder="Search …"
                />

                {searchParams.query !== "" && (
                    <button
                        type="button"
                        onClick={() => handleClearQuery()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        aria-label="Clear search"
                    >
                        <IconClose />
                    </button>
                )}
            </div>

            {!isOpen && <Button
                priority="secondary"
                onClick={onSearchClick}
                disabled={searchParams.query === ""}
            >
                <IconSearch />
            </Button>}

            <Button
                priority={searchParams.ingredient_names.length === 0 ? "secondary" : "primary"}
                onClick={onFilterClick}
            >
                <IconFilter />
            </Button>
        </div>
    );
}