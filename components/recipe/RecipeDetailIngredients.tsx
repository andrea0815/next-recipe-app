"use client";
import Button from '@/components/buttons/Button';
import IngredientDisplay from '@/components/ingredient/InrgredientDisplay';
import ShoppingListCheckbox from '@/components/shoppinglist/ShoppingListCheckbox';
import UnitDisplay from '@/components/unit/UnitDisplay';
import { formatAmount } from "@/lib/db/utils/formatDecimals";

import React, { useState } from 'react';
import NumberSelect from '../form/NumberSelect';

export default function RecipeDetailIngredients({
    groupedIngredients,
    recipeId,
    portions,
    groupsEnabled
}: {
    groupedIngredients: Record<string, any[]>,
    portions: number,
    recipeId: string,
    groupsEnabled: boolean
}) {    

    const [portionsDisplay, setPortionsDisplay] = useState(portions);

    return (
        <>
            <h2 className='text-2xl font-bold'>Portionen</h2>

            <div className='my-4'>
                <NumberSelect
                    portions={portionsDisplay}
                    onPortionChange={setPortionsDisplay}
                />
            </div>

            <h2 className='text-2xl mt-10 font-bold mb-4'>Ingredients</h2>


            <div className="grid w-full grid-cols-[max-content_max-content_max-content_1fr] lg:gap-x-4 gap-x-2 mb-4">
                {Object.entries(groupedIngredients).map(([groupName, ingredients]) => (
                    <React.Fragment key={groupName}>

                        {/* Group header */}
                        {groupsEnabled && (
                            <div className="col-span-4 mt-4 mb-2">
                                <h3 className="font-bold text-text text-sm uppercase">
                                    {groupName}
                                </h3>
                            </div>
                        )}

                        {/* Rows */}
                        {ingredients.map((recipeIngredient, index) => {
                            const calculatedAmount =
                                portions > 0
                                    ? Number(recipeIngredient.amount) * (portionsDisplay / portions)
                                    : 0;

                            return (
                                <React.Fragment key={index}>
                                    <ShoppingListCheckbox
                                        recipeIngredientId={recipeIngredient.id}
                                        recipeId={recipeId}
                                        recipePortions={portionsDisplay}
                                        initialOnList={!!recipeIngredient.on_shopping_list}
                                    />

                                    <p className="py-1 min-w-10 text-right border-b border-gray-400">
                                        {formatAmount(calculatedAmount)}
                                    </p>

                                    <p className="py-1 border-b border-gray-400">
                                        <UnitDisplay
                                            amount={calculatedAmount}
                                            unit={recipeIngredient.unit}
                                        />
                                    </p>

                                    <p className="py-1 border-b border-gray-400 min-w-0">
                                        <IngredientDisplay
                                            amount={calculatedAmount}
                                            ingredient={recipeIngredient.ingredient}
                                        />
                                    </p>
                                </React.Fragment>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
