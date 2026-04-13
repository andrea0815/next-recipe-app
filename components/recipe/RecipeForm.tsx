"use client";
import { useActionState, useState, useRef } from 'react';
import { FormState, createRecipe, editRecipe } from '@/actions/recipes';

import type { Category } from '@/types/category';
import type { Unit } from '@/types/unit';
import type { Ingredient, IngredientDraft } from '@/types/ingredient';
import type { RecipeDraft } from '@/types/recipe';
import type { PanelRef } from '@/components/ingredient/IngredientPanel';
import { FormMode, ItemType } from '@/types/general';

import CategoryMultiSelect from './CategoryMultiSelect';
import IngredientEditor from './IngredientEditor';
import StepEditor from './StepEditor';
import InputWrapper from '../form/InputWrapper';
import Switch from '../form/Switch';
import InputFieldText from '../form/InputFieldText';
import InputMultiSelect from '../form/InputMultiSelect';
import InputFieldNumber from '../form/InputFieldNumber';
import Button from '../buttons/Button';
import IngredientPanel from '../ingredient/IngredientPanel';
import IconAdd from '../icons/IconAdd';
import SectionWrapper from '../containers/SectionWrapper';
import SectionHeadline from '../typography/SectionHeadline';



export default function RecipeForm({
    categories,
    initialIngredients,
    units,
    initialDraft,
    mode
}: {
    categories: Category[];
    initialIngredients: Ingredient[];
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

    const [ingredients, setIngredients] = useState(initialIngredients);
    const [selectedIngredientId, setSelectedIngredientId] = useState("");
    const IngredientPanelRef = useRef<PanelRef>(null);

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
                className='w-full max-w-200 flex flex-col gap-4 justify-center items-center'
            >
                <SectionWrapper customClass='w-full max-w-200 flex flex-col gap-4'>
                    <SectionHeadline>General</SectionHeadline>

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

                    <InputMultiSelect<Category, "id", "name">
                        labelName="Categories"
                        items={categories}
                        selectedValues={draft.category_ids}
                        valueKey="id"
                        labelKey="name"
                        onChange={(ids) => updateDraft("category_ids", ids)}
                    />
                </SectionWrapper>

                <SectionWrapper customClass='w-full max-w-200 flex flex-col gap-4'>

                    <SectionHeadline>Ingredients</SectionHeadline>

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
                        addButton={
                            <div className='w-full px-2 pt-2'>
                                <Button
                                    type="button"
                                    priority='secondary'
                                    size='small'
                                    stretch={true}
                                    onClick={() => IngredientPanelRef.current?.open()}
                                >
                                    <IconAdd />  Add
                                </Button>
                            </div>
                        }
                        onGroupsChange={(groups) => updateDraft("groups", groups)}
                        onGroupsEnabledChange={(enabled) => updateDraft("groups_enabled", enabled)}
                    />
                </SectionWrapper>

                <SectionWrapper customClass='w-full max-w-200 flex flex-col gap-4'>


                    <SectionHeadline>Steps</SectionHeadline>

                    <StepEditor
                        state={state}
                        steps={draft.steps}
                        onChange={(steps) => updateDraft("steps", steps)}
                    />
                </SectionWrapper>


                <Button
                    type="submit"
                    size='big'
                    customClass=''
                    stretch={true}
                    disabled={
                        isPending ||
                        Object.keys(state.errors).length > 0 ||
                        draft.name.trim() === "" ||
                        draft.subtitle.trim() === ""
                    }
                >
                    {isPending ? submitButtonText.pending : submitButtonText.static}
                </Button>
            </form >

            <IngredientPanel
                ref={IngredientPanelRef}
                mode={FormMode.CREATE}
                type={ItemType.INGREDIENT}
                onCreated={(ingredient) => {
                    setIngredients((prev) => [...prev, ingredient]);
                    setSelectedIngredientId(ingredient.id);
                }}
            />

        </>
    );
}
