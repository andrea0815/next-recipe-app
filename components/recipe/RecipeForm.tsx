"use client";
import { useActionState, useState, useRef, useEffect } from 'react';
import { createRecipe, editRecipe } from '@/actions/recipes';

import type { Category } from '@/types/category';
import type { Unit } from '@/types/unit';
import type { Ingredient } from '@/types/ingredient';
import type { HeatingMeta, RecipeDraft, RecipeFields } from '@/types/recipe';
import { HEATING_META } from '@/types/recipe';
import type { PanelRef } from '@/components/ingredient/IngredientPanel';
import { ActionResult } from "@/types/actions";
import { FormMode, ItemType } from '@/types/general';

import IngredientEditor from './IngredientEditor';
import StepEditor from './StepEditor';
import Switch from '../form/Switch';
import InputFieldText from '../form/InputFieldText';
import InputMultiSelect from '../form/InputMultiSelect';
import Button from '../buttons/Button';
import IngredientPanel from '../ingredient/IngredientPanel';
import IconAdd from '../icons/IconAdd';
import SectionWrapper from '../containers/SectionWrapper';
import SectionHeadline from '../typography/SectionHeadline';
import NumberSelect from '../form/NumberSelect';
import InputSelect from '../form/InputSelect';
import IconClock from '../icons/IconClock';
import IconThermormeter from '../icons/IconThermormeter';
import UnitPanel from '../unit/UnitPanel';
import ImageUpload from './ImageUpload';
import IconSpinner from '../icons/IconSpinner';

export default function RecipeForm({
    categories,
    initialIngredients,
    initialUnits,
    initialDraft,
    mode
}: {
    categories: Category[];
    initialIngredients: Ingredient[];
    initialUnits: Unit[];
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
        setHasFieldErros(Object.keys(state.fieldErrors ?? {}).length > 0)
    }, [state])


    // Heating Options
    const heatingOptions: HeatingMeta[] = Object.values(HEATING_META);
    const getHeatingMetaById = (id: string): HeatingMeta | null => {
        return heatingOptions.find((option) => option.id === id) ?? null;
    };
    const HeatingModeIcon = getHeatingMetaById(draft.heating_mode ?? "")?.icon

    // Ingredients
    const [ingredients, setIngredients] = useState(initialIngredients);
    const [selectedIngredientId, setSelectedIngredientId] = useState("");
    const IngredientPanelRef = useRef<PanelRef>(null);

    // Units
    const [units, setUnits] = useState<Unit[]>(initialUnits);
    const [selectedUnitId, setSelectedUnitId] = useState("");
    const UnitPanelRef = useRef<PanelRef>(null);

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

        console.log(draft);
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

                    <InputMultiSelect<Category, "id", "name">
                        labelName="Categories"
                        items={categories}
                        selectedValues={draft.category_ids}
                        placeholder="Select categories …"
                        valueKey="id"
                        labelKey="name"
                        name='category_ids'
                        onChange={(ids) => updateDraft("category_ids", ids)}
                    />
                </SectionWrapper>

                <SectionWrapper customClass='w-full max-w-200 flex flex-col gap-4'>
                    <ImageUpload<RecipeDraft, "image_uri">
                        field="image_uri"
                        updateDraftValue={updateDraft}
                        draftValue={draft.image_uri}
                    />
                </SectionWrapper>

                <SectionWrapper customClass='w-full max-w-200 flex flex-col gap-4'>
                    <div className="flex justify-between items-center">
                        <h2 className='text-xl font-semibold'>Baking Details</h2>
                        <Switch
                            checked={draft.heating_details_enabled}
                            name="heating_details_enabled"
                            onChange={(checked) => updateDraft("heating_details_enabled", checked)}
                        />
                    </div>

                    {draft.heating_details_enabled &&
                        <div className='mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:flex-row'>

                            <div className='flex-1 flex flex-col justify-center items-center bg-gray-300 px-4 pt-4 pb-6 rounded-lg sm:aspect-square'>
                                <div className='flex-1 flex justify-center items-center text-green-400 p-6 sm:p-0'>
                                    {HeatingModeIcon ? <HeatingModeIcon size={50} /> : <p className='h-12.5'>Nothing selected.</p>}
                                </div>

                                <div className='w-full'>
                                    <InputSelect<RecipeDraft, "heating_mode", HeatingMeta>
                                        field="heating_mode"
                                        items={heatingOptions}
                                        updateDraftValue={(field, value) => updateDraft(field, value)}
                                        name="heating_mode"
                                        draftValue={draft.heating_mode ?? ""}
                                        {...(!state.success && state.fieldErrors?.heating_mode
                                            ? { error: state.fieldErrors.heating_mode }
                                            : {})}
                                        customClass="w-full text-center"
                                    />
                                </div>

                                <p className='mt-2'>Heating Mode</p>
                            </div>

                            <div className='flex-1 flex flex-col justify-center items-center bg-gray-300 px-4 pt-4 pb-6 rounded-lg sm:aspect-square'>


                                <div className='flex-1 flex justify-center items-center text-green-400 p-6 sm:p-0'>
                                    <IconClock size={50} />
                                </div>
                                <div className=''>
                                    <NumberSelect
                                        portions={draft.time ?? 10}
                                        name='time'
                                        stretch={true}
                                        onPortionChange={(valueOrUpdater) => {
                                            const nextValue =
                                                typeof valueOrUpdater === "function"
                                                    ? valueOrUpdater(draft.time ?? 0)
                                                    : valueOrUpdater;

                                            updateDraft("time", nextValue);
                                        }}
                                    />
                                </div>

                                <p className='mt-2'>Time (Minutes)</p>


                            </div>

                            <div className='flex-1 flex flex-col justify-center items-center bg-gray-300 px-4 pt-4 pb-6 rounded-lg sm:aspect-square'>

                                <div className='flex-1 flex justify-center items-center text-green-400 p-6 sm:p-0'>
                                    <IconThermormeter size={50} />
                                </div>
                                <div className=''>
                                    <NumberSelect
                                        portions={draft.temperature ?? 180}
                                        name='temperature'
                                        step={5}
                                        min={0}
                                        stretch={true}
                                        onPortionChange={(valueOrUpdater) => {
                                            const nextValue =
                                                typeof valueOrUpdater === "function"
                                                    ? valueOrUpdater(draft.temperature ?? 0)
                                                    : valueOrUpdater;
                                            updateDraft("temperature", nextValue);
                                        }}
                                    />
                                </div>
                                <p className='mt-2'>Temperature (°C)</p>



                            </div>


                        </div>
                    }

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
                        addIngredientButton={
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
                        addUnitButton={
                            <div className='w-full px-2 pt-2'>
                                <Button
                                    type="button"
                                    priority='secondary'
                                    size='small'
                                    stretch={true}
                                    onClick={() => UnitPanelRef.current?.open()}
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
                    {isPending ? <>
                        <IconSpinner />
                        <p>{submitButtonText.pending}</p>
                    </> : <>
                        <p>{submitButtonText.static}</p>
                    </>
                    }
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

            <UnitPanel
                ref={UnitPanelRef}
                mode={FormMode.CREATE}
                type={ItemType.UNIT}
                onCreated={(unit) => {
                    setUnits((prev) => [...prev, unit]);
                    setSelectedUnitId(unit.id);
                }}
            />
        </>
    );
}
