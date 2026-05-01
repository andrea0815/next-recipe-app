import { Ingredient } from '@/types/ingredient';
import InputMultiSelect from '../form/InputMultiSelect';
import Button from '../buttons/Button';
import IconSearch from '../icons/IconSearch';
import { Suspense } from 'react';
import InputSelectLoading from '../form/InputSelectLoading';

export default function SearchPanelContent({
    isOpen = true,
    ingredientsPromise,
    selectedIngredients,
    onSearchButton,
    onClearButton,
    onIngredientsChange,
}: {
    isOpen: boolean
    ingredientsPromise: Promise<Ingredient[]>
    selectedIngredients: string[]
    onSearchButton: () => void
    onClearButton: () => void
    onIngredientsChange: (ingredients: string[]) => void,
}) {

    if (!ingredientsPromise) {
        throw new Error("SearchPanelContent did not receive ingredientsPromise");
    }

    const handleSearchButton = () => {
        onSearchButton();
    }
    const handleClearButton = () => {
        onClearButton();
    }

    return (
        <div
            className={`${isOpen ? "max-h-[50dvh] h-[inherit]" : "max-h-0 overflow-hidden"
                } w-full transition-all duration-300 flex`}
        >
            <div className="flex-1 sm:p-3 p-2 w-full flex flex-col gap-4 items-between">
                <h3 className='text-xl font-semibold text-left mt-4'>Filter by Ingredients</h3>
                <div className='flex-1 mb-10'>

                    <Suspense fallback={<InputSelectLoading placeholder='Select an item…' />}>
                        <InputMultiSelect<Ingredient, "name", "name">
                            itemsPromise={ingredientsPromise}
                            selectedValues={selectedIngredients}
                            onChange={onIngredientsChange}
                            valueKey="name"
                            labelKey="name"
                        />
                    </Suspense>
                </div>
                <Button
                    stretch={true}
                    priority='secondary'
                    onClick={handleClearButton}
                >
                    Clear all filters
                </Button>
                <Button
                    stretch={true}
                    onClick={handleSearchButton}
                >
                    <IconSearch /> Search with Filters
                </Button>
            </div>
        </div>
    );
}
