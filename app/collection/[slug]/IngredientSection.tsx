"use client";
import Button from '@/components/buttons/Button';
import IngredientDisplay from '@/components/ingredient/InrgredientDisplay';
import UnitDisplay from '@/components/unit/UnitDisplay';
import { formatAmount } from "@/lib/db/utils/formatDecimals";

import { useState } from 'react';

export default function IngredientSection({
    groupedIngredients,
    portions,
    groupsEnabled
}: {
    groupedIngredients: Record<string, any[]>,
    portions: number,
    groupsEnabled: boolean
}) {

    const [portionsDisplay, setPortionsDisplay] = useState(portions);

    const addPortion = () => {
        setPortionsDisplay(prev => Math.min(999, prev + 1));
    }

    const subtractPortion = () => {
        setPortionsDisplay(prev => Math.max(1, prev - 1));
    }

    return (
        <>
            <h2 className='text-2xl font-bold'>Portionen</h2>

            <div className='flex gap-2 items-center my-4'>
                <Button
                    onClick={subtractPortion}
                    size='small'
                    disabled={portionsDisplay <= 1}
                >
                    -
                </Button>
                <p className='w-10 text-center bg-white p-1 rounded-md'>{portionsDisplay.toString()}</p>
                <Button
                    onClick={addPortion}
                    size='small'
                >
                    +
                </Button>
            </div>

            <h2 className='text-2xl mb-4 mt-10 font-bold'>Ingredients</h2>


            <div className="space-y-4">
                {Object.entries(groupedIngredients).map(([groupName, ingredients]) => (
                    <div key={groupName}>
                        {groupsEnabled && (
                            <h3 className="font-semibold text-text mb-2">{groupName}</h3>
                        )}
                        <h3 className="font-bold text-sm text-text uppercase mb-2">{groupName}</h3>

                        <ul className="flex flex-col w-[200px]">
                            {ingredients.map((recipeIngredient) => {
                                const calculatedAmount =
                                    (Number(recipeIngredient.amount) / portions) * portionsDisplay;

                                return (
                                    <li key={recipeIngredient.id} className="grid grid-cols-[max-content_max-content_1fr] gap-4 py-1 border-b border-gray-400 last-of-type:border-b-0">
                                        <p className='text-right'>{formatAmount(calculatedAmount)}</p>
                                        <p>
                                            <UnitDisplay amount={calculatedAmount} unit={recipeIngredient.units} />
                                        </p>
                                        <p className="whitespace-nowrap">
                                            <IngredientDisplay
                                                amount={calculatedAmount}
                                                ingredient={recipeIngredient.ingredients}
                                            />
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div >
        </>
    );
}
