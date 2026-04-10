import { SearchParams } from "@/types/search";
import Button from "../buttons/Button";
import IconFilter from "../icons/IconFilter";
import IconSearch from "../icons/IconSearch";

export default function SearchBar({
    isOpen,
    searchParams,
    onFilterClick,
    onQueryChange,
    onSearchClick,
}: {
    isOpen: boolean;
    searchParams: SearchParams;
    onFilterClick: () => void;
    onQueryChange: (query: string) => void;
    onSearchClick: () => void;
}) {
    
    return (
        <div className="flex gap-2 w-full p-3">
            <input
                type="text"
                value={searchParams.query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="bg-white w-full px-4 py-3 rounded-lg transition-all"
                placeholder="Search …"
            />

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