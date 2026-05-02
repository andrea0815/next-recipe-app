"use client";
import Button from '@/components/buttons/Button';
import IngredientDisplay from '@/components/ingredient/InrgredientDisplay';
import ShoppingListCheckbox from '@/components/shoppinglist/ShoppingListCheckbox';
import UnitDisplay from '@/components/unit/UnitDisplay';
import { formatAmount } from "@/lib/db/utils/formatDecimals";

import React, { useState } from 'react';
import NumberSelect from '../form/NumberSelect';

export default function RecipeDetailIngredientsSkeleton() {

    return (
        <>
            <h2 className='text-2xl font-bold'>Portionen</h2>

            <div className='my-4'>
                <div className="h-(--btn-h-md) w-30 rounded-lg bg-gray-300 animate-pulse"></div>
            </div>

            <h2 className='text-2xl mt-10 font-bold mb-4'>Ingredients</h2>


            <div className="w-full flex flex-col lg:gap-y-4 gap-y-1 mb-3">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="h-6 w-full rounded-lg bg-gray-300 animate-pulse"></div>
                ))}
            </div>
        </>
    );
}
