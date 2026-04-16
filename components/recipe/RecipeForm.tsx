"use client";
import { useActionState, useState, useRef, useEffect } from 'react';
import { createRecipe, editRecipe } from '@/actions/recipes';

import type { Category } from '@/types/category';
import type { Unit } from '@/types/unit';
import type { Ingredient } from '@/types/ingredient';
import type { RecipeDraft, RecipeFields } from '@/types/recipe';
import type { PanelRef } from '@/components/ingredient/IngredientPanel';
import { ActionResult } from "@/types/actions";
import { FormMode, ItemType } from '@/types/general';

import IngredientEditor from './IngredientEditor';
import StepEditor from './StepEditor';
import InputWrapper from '../form/InputWrapper';
import Switch from '../form/Switch';
import InputFieldText from '../form/InputFieldText';
import InputMultiSelect from '../form/InputMultiSelect';
import Button from '../buttons/Button';
import IngredientPanel from '../ingredient/IngredientPanel';
import IconAdd from '../icons/IconAdd';
import SectionWrapper from '../containers/SectionWrapper';
import SectionHeadline from '../typography/SectionHeadline';
import NumberSelect from '../form/NumberSelect';

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

    const initialState: ActionResult<RecipeFields, undefined> = {
        success: false,
        message: "",
    };

    const action =
        mode === FormMode.CREATE
            ? createRecipe
            : editRecipe.bind(null, initialDraft.id, initialDraft.slug);

    const [state, formAction, isPending] = useActionState(action, initialState);
    const [hasFieldErrors, setHasFieldErros] = useState(Object.keys(state.fieldErrors ?? {}).length > 0);
    const [draft, setDraft] = useState<RecipeDraft>(initialDraft);

    useEffect(() => {
        console.log(state);
        setHasFieldErros(Object.keys(state.fieldErrors ?? {}).length > 0)
    }, [state])


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
                className='w-full max-w-200 flex flex-col gap-6 justify-center items-center'
            >
                <SectionWrapper customClass='w-full max-w-200 flex flex-col gap-4'>
                    <SectionHeadline>General</SectionHeadline>
                    <InputFieldText<RecipeDraft, "name">
                        field="name"
                        labelName="Name*"
                        draftValue={draft.name}
                        updateDraftValue={updateDraft}
                        {...(!state.success && state.fieldErrors?.name
                            ? { error: state.fieldErrors.name }
                            : {})}
                    />

                    <InputFieldText<RecipeDraft, "subtitle">
                        field="subtitle"
                        labelName="Subtitle*"
                        draftValue={draft.subtitle}
                        updateDraftValue={updateDraft}
                        {...(!state.success && state.fieldErrors?.subtitle
                            ? { error: state.fieldErrors.subtitle }
                            : {})}
                    />

                    <div className="flex justify-between items-center">
                        <p>Should this recipe be public?</p>

                        <Switch
                            checked={draft.is_public}
                            name="is_public"
                            onChange={(checked) => updateDraft("is_public", checked)}
                        />
                    </div>

                    <InputFieldText<RecipeDraft, "image_uri">
                        field="image_uri"
                        labelName="Image"
                        draftValue={draft.image_uri}
                        updateDraftValue={updateDraft}
                        {...(!state.success && state.fieldErrors?.image_uri
                            ? { error: state.fieldErrors.image_uri }
                            : {})} />

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

                    <div className='mb-4'>

                        <NumberSelect
                            portions={draft.portions}
                            name='portions'
                            onPortionChange={(valueOrUpdater) => {
                                const nextValue =
                                    typeof valueOrUpdater === "function"
                                        ? valueOrUpdater(draft.portions)
                                        : valueOrUpdater;

                                updateDraft("portions", nextValue);
                            }}
                        />
                    </div>

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


                    <SectionHeadline>Instructions</SectionHeadline>

                    <StepEditor
                        state={state}
                        steps={draft.steps}
                        onChange={(steps) => updateDraft("steps", steps)}
                    />
                </SectionWrapper>

                {state.fieldErrors && Object.keys(state.fieldErrors).length > 0 && (
                    <div className="w-full rounded-xl text-sm text-red border-2 border-red py-2 px-4">
                        <p className="font-medium">Please fix following fields:</p>
                        <ul className="">
                            {Object.entries(state.fieldErrors).map(([field, message]) => (
                                <li key={field}>
                                    – {message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


                <Button
                    type="submit"
                    size='big'
                    customClass=''
                    stretch={true}
                    disabled={
                        isPending
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
