"use client"

import { useState, useRef } from 'react';

import { removeIngredient } from "@/actions/ingredients";

import type { AddIngredientPanelRef } from '@/components/ingredient/AddIngredientPanel';
import type { Ingredient, IngredientDraft, IngredientListItem, CreatedIngredient } from '@/types/ingredient';
import { ItemType } from "@/types/general"

import ListSection from '@/components/general/ListSection';
import PageHeadline from "@/components/typography/PageHeadline";
import AddIngredientPanel from "@/components/ingredient/AddIngredientPanel";
import Button from "@/components/buttons/Button";
import IconAdd from '@/components/icons/IconAdd';

type PreparedIngredient = {
    id: string;
    editHref: string;
    textItems: string[];
};

export default function IngredientSection({
    preparedIngredients,
}: {
    preparedIngredients: PreparedIngredient[]
}) {

    const [displayed, setDisplayed] = useState(preparedIngredients);
    const [selectedIngredientId, setSelectedIngredientId] = useState("");
    const addIngredientPanelRef = useRef<AddIngredientPanelRef>(null);

    function prepareIngredient(item: CreatedIngredient): IngredientListItem {
        return {
            id: item.id,
            editHref: `/profile/ingredients/${item.id}/edit`,
            textItems: [item.name, item.plural || "–"],
        };
    }

    return (<div className='w-full max-w-200 flex flex-col gap-4'>
        <PageHeadline>Ingredients</PageHeadline>
        <Button
            type="button"
            priority='secondary'
            size='medium'
            stretch={true}
            onClick={() => addIngredientPanelRef.current?.open()}
        >
            <IconAdd />  Add ingredient
        </Button>
        <ListSection items={displayed} removeItem={removeIngredient} type={ItemType.INGREDIENT} />
        <AddIngredientPanel
            ref={addIngredientPanelRef}
            onCreated={(ingredient) => {
                setDisplayed((prev) => [...prev, prepareIngredient(ingredient)]);
                setSelectedIngredientId(ingredient.id);
            }}
        />
    </div>
    );
}
