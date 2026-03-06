"use client";

import { useMemo, useState } from "react";
import type { Unit } from "@/types/unit";
import type { Ingredient } from "@/types/ingredient";

type Line = {
  amount: string;
  unit_id: string;
  ingredient_id: string;
};

export default function IngredientEditor({
  state,
  ingredients,
  units,
}: {
  state: any; // your FormState (keep as any for now)
  ingredients: Ingredient[];
  units: Unit[];
}) {
  const [draft, setDraft] = useState<Line>({
    amount: "",
    unit_id: "",
    ingredient_id: "",
  });

  const [lines, setLines] = useState<Line[]>([]);

  const unitById = useMemo(
    () => new Map(units.map((u) => [u.id, u])),
    [units]
  );
  const ingredientById = useMemo(
    () => new Map(ingredients.map((i) => [i.id, i])),
    [ingredients]
  );

  function addLine() {
    // basic validation for the draft line
    if (!draft.amount || !draft.unit_id || !draft.ingredient_id) return;

    setLines((prev) => [...prev, draft]);
    setDraft({ amount: "", unit_id: "", ingredient_id: "" });
  }

  function removeLine(index: number) {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold">Ingredients</h2>

      {/* Draft input row */}
      <div className="flex gap-2 items-end">
        <label className="text-white w-28">
          Amount
          <input
            type="text"
            value={draft.amount}
            onChange={(e) => setDraft((d) => ({ ...d, amount: e.target.value }))}
            className="block w-full p-2 bg-white text-black border rounded"
            placeholder="e.g. 200"
          />
        </label>

        <label className="text-white flex-1">
          Unit
          <select
            value={draft.unit_id}
            onChange={(e) => setDraft((d) => ({ ...d, unit_id: e.target.value }))}
            className="block w-full p-2 bg-white text-black border rounded"
          >
            <option value="" disabled>
              Select unit…
            </option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name} ({unit.abbreviation})
              </option>
            ))}
          </select>
        </label>

        <label className="text-white flex-1">
          Ingredient
          <select
            value={draft.ingredient_id}
            onChange={(e) =>
              setDraft((d) => ({ ...d, ingredient_id: e.target.value }))
            }
            className="block w-full p-2 bg-white text-black border rounded"
          >
            <option value="" disabled>
              Select ingredient…
            </option>
            {ingredients.map((ingredient) => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={addLine}
          className="px-3 py-2 rounded bg-blue-500 text-white disabled:bg-gray-500"
          disabled={!draft.amount || !draft.unit_id || !draft.ingredient_id}
        >
          Add
        </button>
      </div>

      {/* Show server-side validation errors (if you keep them) */}
      {(state?.errors?.amounts || state?.errors?.unit_ids || state?.errors?.ingredient_ids) && (
        <div className="space-y-1">
          {state.errors.amounts && <p className="text-red-500">{state.errors.amounts}</p>}
          {state.errors.unit_ids && <p className="text-red-500">{state.errors.unit_ids}</p>}
          {state.errors.ingredient_ids && <p className="text-red-500">{state.errors.ingredient_ids}</p>}
        </div>
      )}

      {/* Added lines list */}
      <div className="space-y-2">
        {lines.map((line, index) => {
          const unit = unitById.get(line.unit_id);
          const ing = ingredientById.get(line.ingredient_id);

          return (
            <div
              key={`${line.ingredient_id}-${line.unit_id}-${index}`}
              className="flex items-center justify-between gap-2 p-2 rounded border border-white/20 bg-white/5"
            >
              <div className="text-white">
                <span className="font-semibold">{line.amount}</span>{" "}
                {unit ? unit.abbreviation : line.unit_id}{" "}
                {ing ? ing.name : line.ingredient_id}
              </div>

              <button
                type="button"
                onClick={() => removeLine(index)}
                className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                title="Remove"
              >
                ✕
              </button>

              {/* Hidden inputs: THIS is what gets submitted */}
              <input type="hidden" name="amounts" value={line.amount} />
              <input type="hidden" name="unit_ids" value={line.unit_id} />
              <input type="hidden" name="ingredient_ids" value={line.ingredient_id} />
            </div>
          );
        })}
      </div>

      {/* Optional: show a message if no lines */}
      {lines.length === 0 && (
        <p className="text-white/70 text-sm">No ingredients added yet.</p>
      )}
    </div>
  );
}