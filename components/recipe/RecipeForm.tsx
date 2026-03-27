"use client";
import { useActionState, useState } from 'react';
import { FormState, createRecipe, editRecipe } from '@/actions/recipes';

import type { Category } from '@/types/category';
import type { Unit } from '@/types/unit';
import type { Ingredient } from '@/types/ingredient';
import type { RecipeDraft } from '@/types/recipe';
import { FormMode } from '@/types/general';

import CategoryMultiSelect from './CategoryMultiSelect';
import IngredientEditor from './IngredientEditor';
import StepEditor from './StepEditor';
import InputWrapper from '../form/InputWrapper';
import Switch from '../form/Switch';
import InputFieldText from '../form/InputFieldText';
import InputMultiSelect from '../form/InputMultiSelect';
import InputFieldNumber from '../form/InputFieldNumber';



export default function RecipeForm({
    categories,
    ingredients,
    units,
    initialDraft,
    mode
}: {
    categories: Category[];
    ingredients: Ingredient[];
    units: Unit[];
    initialDraft: RecipeDraft;
    mode: FormMode;
}) {
    const initialState: FormState = {
        errors: {},
    };

    const action =
        mode === FormMode.CREATE
            ? createRecipe
            : editRecipe.bind(null, initialDraft.id, initialDraft.slug);

    const [state, formAction, isPending] = useActionState(action, initialState);
    const [draft, setDraft] = useState<RecipeDraft>(initialDraft);

    const submitButtonText = mode === FormMode.CREATE ?
        {
            static: "Create Recipe",
            pending: "Creating Recipe …"
        } :
        {
            static: "Save Changes",
            pending: "Saving Changes …"
        }



    function updateDraft<K extends keyof RecipeDraft>(
        field: K,
        value: RecipeDraft[K]
    ) {
        setDraft((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
        <>
            <form
                action={formAction}
                className='flex flex-col gap-4'
            >

                <InputFieldText<RecipeDraft, "name">
                    field="name"
                    labelName="Name"
                    draftValue={draft.name}
                    updateDraftValue={updateDraft}
                    error={state.errors.name}
                />

                <InputFieldText<RecipeDraft, "subtitle">
                    field="subtitle"
                    labelName="Subtitle"
                    draftValue={draft.subtitle}
                    updateDraftValue={updateDraft}
                    error={state.errors.subtitle}
                />

                <InputWrapper labelName='Should this recipe be public?'>
                    <Switch
                        checked={draft.is_public}
                        name="is_public"
                        onChange={(checked) => updateDraft("is_public", checked)}
                    />
                </InputWrapper>

                <InputFieldText<RecipeDraft, "image_uri">
                    field="image_uri"
                    labelName="Image"
                    draftValue={draft.image_uri}
                    updateDraftValue={updateDraft}
                    error={state.errors.image_uri}
                />

                <InputMultiSelect
                    labelName="Categories"
                    items={categories}
                    selectedIds={draft.category_ids}
                    onChange={(ids) => updateDraft("category_ids", ids)}
                />

                <h2 className="text-text text-lg font-semibold mt-6">Ingredients</h2>

                <InputFieldNumber<RecipeDraft, "portions">
                    labelName="Portions"
                    field="portions"
                    draftValue={draft.portions}
                    updateDraftValue={updateDraft}
                    min={1}
                    step={1}
                    error={state.errors.portions}
                />

                <IngredientEditor
                    state={state}
                    ingredients={ingredients}
                    units={units}
                    groups={draft.groups}
                    groupsEnabled={draft.groups_enabled}
                    onGroupsChange={(groups) => updateDraft("groups", groups)}
                    onGroupsEnabledChange={(enabled) => updateDraft("groups_enabled", enabled)}
                />

                <StepEditor
                    state={state}
                    steps={draft.steps}
                    onChange={(steps) => updateDraft("steps", steps)}
                />

                <button
                    type="submit"
                    className="block w-full p-2 text-text bg-blue-500 rounded disabled:bg-gray-500 cursor-pointer"
                    disabled={isPending}
                >
                    {isPending ? submitButtonText.pending : submitButtonText.static}
                </button>
            </form >
        </>
    );
}
