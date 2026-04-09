import Button from "../buttons/Button";
import IconFilter from "../icons/IconFilter";
import IconSearch from "../icons/IconSearch";

export default function SearchBar({
    isOpen,
    query,
    onFilterClick,
    onQueryChange,
}: {
    isOpen: boolean;
    query: string;
    onFilterClick: () => void;
    onQueryChange: (query: string) => void;
}) {
    return (
        <div className="flex gap-2 w-full p-3">
            <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                className="bg-white w-full px-4 py-3 rounded-lg transition-all"
                placeholder="Search …"
            />

            {!isOpen && <Button
                priority="secondary"
            >
                <IconSearch />
            </Button>}

            <Button
                priority="secondary"
                onClick={onFilterClick}
            >
                <IconFilter />
            </Button>
        </div>
    );
}