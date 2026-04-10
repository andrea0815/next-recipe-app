import { Ingredient } from '@/types/ingredient';
import React from 'react';
import InputSelectSearchable from '../form/InputSelectSearchable';
import InputMultiSelect from '../form/InputMultiSelect';
import SectionHeadline from '../typography/SectionHeadline';
import Button from '../buttons/Button';
import IconSearch from '../icons/IconSearch';

export default function SearchPanelContent({
    isOpen = true,
    ingredients,
    selectedIngredients,
    onSearchButton,
    onClearButton,
    onIngredientsChange,
}: {
    isOpen: boolean
    ingredients: Ingredient[]
    selectedIngredients: string[]
    onSearchButton: () => void
    onClearButton: () => void
    onIngredientsChange: (ingredients: string[]) => void,
}) {

    const handleSearchButton = () => {
        onSearchButton();
    }
    const handleClearButton = () => {
        onClearButton();
    }

    return (
        <div
            className={`${isOpen ? "max-h-[50dvh] h–[inherit]" : "max-h-0 overflow-hidden"
                } w-full transition-all duration-300 flex`}
        >
            <div className="flex-1 p-3 w-full flex flex-col gap-4 items-between">
                <h3 className='text-xl font-semibold text-left mt-4'>Filter by Ingredients</h3>
                <div className='flex-1 mb-10'>
                    {/* <InputMultiSelect<Ingredient, "name", "name">
                        items={ingredients}
                        selectedValues={selectedIngredients}
                        onChange={onIngredientsChange}
                    /> */}
                    <InputMultiSelect<Ingredient, "name", "name">
                        items={ingredients}
                        selectedValues={selectedIngredients}
                        onChange={onIngredientsChange}
                        valueKey="name"
                        labelKey="name"
                    />
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
