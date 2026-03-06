"use client";

import { useState } from "react";

type Step = {
    text: string;
    hint?: string;
    hint_is_showing: boolean;
};

export default function StepEditor({
    state,
}: {
    state: any;
}) {

    const [steps, setSteps] = useState<Step[]>([]);

    function addStep() {
        setSteps((prev) => [
            ...prev,
            { text: "", hint: "", hint_is_showing: false }
        ]);
    }

    function removeStep(index: number) {
        setSteps((prev) => prev.filter((_, i) => i !== index));
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
                            onChange={(e) =>
                                setSteps((prev) =>
                                    prev.map((s, i) =>
                                        i === index ? { ...s, text: e.target.value } : s
                                    )
                                )
                            }
                            className="block w-full p-2 bg-white text-black border rounded"
                            placeholder="Step text"
                        />
                    </label>


                    <label>
                        hint
                        <input
                            type="checkbox"
                            checked={step.hint_is_showing}
                            onChange={(e) =>
                                setSteps((prev) =>
                                    prev.map((s, i) =>
                                        i === index ? { ...s, hint_is_showing: e.target.checked } : s
                                    )
                                )
                            }
                        />
                    </label>

                    {step.hint_is_showing &&
                        <label className="text-white w-full">
                            Hint
                            <textarea
                                value={step.hint ?? ""}
                                onChange={(e) =>
                                    setSteps((prev) =>
                                        prev.map((s, i) =>
                                            i === index ? { ...s, hint: e.target.value } : s
                                        )
                                    )
                                }
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