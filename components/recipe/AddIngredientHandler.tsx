import React, { RefObject } from 'react';
import { useActionState, use, useState, useRef, useEffect, Suspense } from 'react';
import IngredientPanel, { PanelRef } from '../ingredient/IngredientPanel';
import { FormMode, ItemType } from '@/types/general';
import { Ingredient } from '@/types/ingredient';

export default function AddIngredientHandler({ ingredientsPromise, panelRef }:
    {
        panelRef: RefObject<PanelRef | null>;
        ingredientsPromise: Promise<Ingredient[]>;
    }) {

    const initialIngredients = use(ingredientsPromise)


    const [ingredients, setIngredients] = useState(initialIngredients);
    const [selectedIngredientId, setSelectedIngredientId] = useState("");

    return (
        <IngredientPanel
            ref={panelRef}
            mode={FormMode.CREATE}
            type={ItemType.INGREDIENT}
            onCreated={(ingredient) => {
                setIngredients((prev) => [...prev, ingredient]);
                setSelectedIngredientId(ingredient.id);
            }}
        />
    );
}
