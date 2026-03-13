"use client";

import { useState } from "react";

import type { RecipeStepDraft } from "@/types/recipe";

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

    return (
        <div className="space-y-3">
            <h2 className="text-white font-semibold">Steps</h2>

            {steps.map((step, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-2 items-end bg-gray-600 p-2 rounded-2xl"
                >
                    <label className="text-white w-full">
                        Text
                        <textarea
                            value={step.text}
                            name="step_texts"
                            onChange={(e) => updateStep(index, "text", e.target.value)}
                            className="block w-full p-2 bg-white text-black border rounded"
                            placeholder="Step text"
                        />
                    </label>


                    <label>
                        hint
                        <input
                            type="checkbox"
                            checked={step.hint_is_showing}
                            onChange={(e) => updateStep(index, "hint_is_showing", e.target.checked)}
                        />
                    </label>

                    {step.hint_is_showing &&
                        <label className="text-white w-full">
                            Hint
                            <textarea
                                value={step.hint ?? ""}
                                name="step_hints"
                                onChange={(e) => updateStep(index, "hint", e.target.value)}

                                className="block w-full p-2 bg-white text-black border rounded"
                                placeholder="Optional hint"
                            />
                        </label>
                    }


                    <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                        title="Remove"
                    >
                        ✕
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addStep}
                className="px-3 py-2 rounded bg-blue-500 text-white disabled:bg-gray-500"
            >
                Add Step
            </button>

            {steps.length === 0 && (
                <p className="text-white/70 text-sm">No steps added yet.</p>
            )}
        </div>
    );
}