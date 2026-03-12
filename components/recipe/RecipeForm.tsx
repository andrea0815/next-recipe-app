"use client";
import { useActionState, useState } from 'react';
import { FormState, createRecipe } from '@/actions/recipes';

import type { Category } from '@/types/category';
import type { Unit } from '@/types/unit';
import type { Ingredient } from '@/types/ingredient';

import Navbar from '@/components/Navbar';
import { CategoryMultiSelect } from './CategoryMultiSelect';
import IngredientEditor from './IngredientEditor';
import StepEditor from './StepEditor';

type Draft = {
    name: string;
    subtitle: string;
    image_uri: string;
    is_public: boolean;
}

export default function RecipeForm({
    categories,
    ingredients,
    units,
}: {
    categories: Category[];
    ingredients: Ingredient[];
    units: Unit[];
}) {
    const initialState: FormState = {
        errors: {},
    };

    const [state, formAction, isPending] = useActionState(createRecipe, initialState);

    const [draft, setDraft] = useState<Draft>({
        name: "",
        subtitle: "",
        image_uri: "/images/placeholder.png",
        is_public: false,
    });

    function updateDraft<K extends keyof Draft>(field: K, value: Draft[K]) {
        setDraft((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
        <>
            <Navbar />
            <form
                action={formAction}
                className="p-4 space-y-4 max-w-96"
            >
                <div>
                    <label className="text-white">
                        Name
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-black border rounded"
                            name="name"
                            value={draft.name}
                            onChange={(e) => updateDraft("name", e.target.value)}
                        />
                    </label>
                    {state.errors.name && <p className="text-red-500">{state.errors.name}</p>}
                </div>

                <div>
                    <label className="text-white">
                        Subtitle
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-black border rounded"
                            name="subtitle"
                            value={draft.subtitle}
                            onChange={(e) => updateDraft("subtitle", e.target.value)}
                        />
                    </label>
                    {state.errors.subtitle && <p className="text-red-500">{state.errors.subtitle}</p>}
                </div>

                <div>
                    <label className="text-white">
                        Should this recipe be public?
                        <input
                            type="checkbox"
                            className="block w-full p-2 bg-white text-black border rounded"
                            name="is_public"
                            checked={draft.is_public}
                            onChange={(e) => updateDraft("is_public", e.target.checked)}
                        />
                    </label>
                </div>

                <div>
                    <label className="text-white">
                        Image
                        <input
                            type="text"
                            className="block w-full p-2 bg-white text-black border rounded"
                            name="image_uri"
                            value={draft.image_uri}
                            onChange={(e) => updateDraft("image_uri", e.target.value)}
                        />
                    </label>
                    {state.errors.image_uri && <p className="text-red-500">{state.errors.image_uri}</p>}
                </div>

                <CategoryMultiSelect categories={categories} />
                <IngredientEditor state={state} ingredients={ingredients} units={units} />
                <StepEditor state={state} />

                <button
                    type="submit"
                    className="block w-full p-2 text-white bg-blue-500 rounded disabled:bg-gray-500 cursor-pointer"
                    disabled={isPending}
                >
                    {isPending ? "Creating..." : "Create Recipe"}
                </button>
            </form>
        </>
    );
}
