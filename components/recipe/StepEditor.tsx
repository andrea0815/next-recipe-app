"use client";

import { useState } from "react";

import type { RecipeStepDraft } from "@/types/recipe";

import InputFieldTextfield from "@/components/form/InputFieldTextfield";
import InputWrapper from "@/components/form/InputWrapper";
import Switch from "@/components/form/Switch";
import Button from "../buttons/Button";
import IconClose from "../icons/IconClose";
import IconArrowUp from "../icons/IconArrowUp";
import IconArrowDown from "../icons/IconArrowDown";

export default function StepEditor({
    state,
    steps,
    onChange
}: {
    state: any;
    steps: RecipeStepDraft[];
    onChange: (steps: RecipeStepDraft[]) => void;
}) {


    function addStep() {
        onChange([
            ...steps,
            { text: "", hint: "", hint_is_showing: false, step_index: steps.length },
        ]);
    }

    function removeStep(index: number) {
        onChange(steps.filter((_, i) => i !== index));
    }

    function updateStep<K extends keyof RecipeStepDraft>(
        index: number,
        field: K,
        value: RecipeStepDraft[K]
    ) {
        onChange(
            steps.map((step, i) =>
                i === index
                    ? { ...step, [field]: value }
                    : step
            )
        );
    }

    const swapElements = <T,>(array: T[], index1: number, index2: number): T[] => {
        const newArray = [...array];
        [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
        return newArray;
    };

    function switchWithAbove(index: number): void {
        console.log("HIER");

        if (index === 0) return;
        onChange(swapElements(steps, index, index - 1));
    }

    function switchWithBelow(index: number): void {
        console.log("Nicht");

        if (index === steps.length + 1) return;
        onChange(swapElements(steps, index, index + 1));
    }

    return (
        <div className="space-y-3 flex flex-col justify-end">

            {steps.map((step, index) => (
                <div className="flex flex-row gap-3" key={index}>
                    <div className="flex flex-col justify-center items-center py-2">

                        <div className="flex-1 flex flex-col justify-start text-center">
                            <Button
                                type="button"
                                priority="tertiary"
                                size="small"
                                onClick={() => switchWithAbove(index)}
                                color="gray"
                                customClass="cursor-pointer"
                                disabled={index === 0}
                            >
                                <IconArrowUp />
                            </Button>
                            <p className="font-bold text-lg">{index + 1}</p>
                            <Button
                                type="button"
                                priority="tertiary"
                                size="small"
                                onClick={() => switchWithBelow(index)}
                                color="gray"
                                customClass="cursor-pointer"
                                disabled={index === steps.length - 1}
                            >
                                <IconArrowDown />
                            </Button>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeStep(index)}
                            className="text-gray-500"
                        >
                            <IconClose />
                        </button>
                    </div>
                    <div className="bg-gray-300 p-4 rounded-2xl flex flex-col gap-2 flex-1">
                        <InputFieldTextfield<RecipeStepDraft, "text">
                            field="text"
                            name="step_texts"
                            labelName=""
                            placeholder="Describe this step"
                            draftValue={step.text}
                            updateDraftValue={(_, value) => updateStep(index, "text", value)}
                            error={state.errors.text}
                        />

                        <div className="flex justify-start gap-4">

                            <InputWrapper labelName='Add tip'>
                                <Switch
                                    checked={step.hint_is_showing}
                                    name="hint_is_showing"
                                    onChange={(checked) => updateStep(index, "hint_is_showing", checked)}
                                />
                            </InputWrapper>

                            {step.hint_is_showing &&

                                <InputFieldTextfield<RecipeStepDraft, "hint">
                                    field="hint"
                                    name="step_hints"
                                    labelName=""
                                    draftValue={step.hint}
                                    updateDraftValue={(_, value) => updateStep(index, "hint", value)}
                                    placeholder="Optional hint"
                                    error={state.errors.hint}
                                    customClass="flex-1"
                                />
                            }


                        </div>
                    </div>

                </div>
            ))
            }

            {
                steps.length === 0 && (
                    <p className="text-text/70 text-sm text-center m-6">No steps added yet.</p>
                )
            }

            <Button
                type="button"
                onClick={addStep}
                priority="secondary"
                customClass="self-end"
                size="small"
            >
                Add Step
            </Button>


        </div >
    );
}