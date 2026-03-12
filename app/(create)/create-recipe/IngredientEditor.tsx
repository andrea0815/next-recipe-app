"use client";

import { useMemo, useState } from "react";
import type { Unit } from "@/types/unit";
import type { Ingredient } from "@/types/ingredient";

type Line = {
  amount: string;
  unit_id: string;
  ingredient_id: string;
};

type Group = {
  group_name: string;
  draft: Line;
  lines: Line[];
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

  const [groups, setGroups] = useState<Group[]>([{
    group_name: "",
    draft: { amount: "", unit_id: "", ingredient_id: "" },
    lines: []
  }]);

  const [groupsEnabled, setGroupsEnabled] = useState<boolean>(false)

  const unitById = useMemo(
    () => new Map(units.map((u) => [u.id, u])),
    [units]
  );
  const ingredientById = useMemo(
    () => new Map(ingredients.map((i) => [i.id, i])),
    [ingredients]
  );

  function addLine(groupIndex: number) {
    setGroups((prev) =>
      prev.map((group, i) => {
        if (i !== groupIndex) return group;

        const { draft } = group;
        if (!draft.amount || !draft.unit_id || !draft.ingredient_id) return group;

        return {
          ...group,
          lines: [...group.lines, draft],
          draft: { amount: "", unit_id: "", ingredient_id: "" },
        };
      })
    );
  }

  function removeLine(groupIndex: number, lineIndex: number) {
    setGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
            ...group,
            lines: group.lines.filter((_, li) => li !== lineIndex),
          }
          : group
      )
    );
  }

  function updateDraft(
    groupIndex: number,
    field: keyof Line,
    value: string
  ) {
    setGroups((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? {
            ...group,
            draft: {
              ...group.draft,
              [field]: value,
            },
          }
          : group
      )
    );
  }

  function addGroup() {
    setGroups((prev) => [
      ...prev,
      { group_name: "", lines: [], draft: { amount: "", unit_id: "", ingredient_id: "" } }
    ]);
  }


  function removeGroup(index: number) {
    setGroups((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      return prev.filter((_, i) => i !== index);
    });
  }

  function updateGroupName(index: number, value: string) {
    setGroups((prev) =>
      prev.map((group, i) =>
        i === index ? { ...group, group_name: value } : group
      )
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-white font-semibold">Ingredients</h2>

      <div>
        <label className="text-white">
          Portions
          <input
            type="number"
            className="block w-full p-2 bg-white text-black border rounded"
            name="portions"
            min="1"
            defaultValue="2"
          />
        </label>
      </div>

      <label >
        Groups enabled
        <input
          type="checkbox"
          name="groups_enabled"
          checked={groupsEnabled}
          onChange={(e) => setGroupsEnabled(e.target.checked)} />
      </label>

      {(groupsEnabled ? groups : [groups[0]]).map((group, index) => (
        <div key={index} className="bg-gray-800 p-5 rounded-2xl">
          {groupsEnabled &&

            <label className="text-white w-28 pt-5">
              Group name
              <input
                type="text"
                value={groupsEnabled ? group.group_name : "General"}
                onChange={(e) => updateGroupName(index, e.target.value)}
                className="block w-full p-2 bg-white text-black border rounded"
                placeholder="group name"
              />
            </label>
          }


          {/* Draft input row */}
          <div className="flex gap-2 items-end">
            <label className="text-white w-28">
              Amount
              <input
                type="number"
                step="0.5"
                min="0"
                defaultValue="1"
                value={group.draft.amount}
                onChange={(e) => updateDraft(index, "amount", e.target.value)}
                className="block w-full p-2 bg-white text-black border rounded"
                placeholder="e.g. 200"
              />
            </label>

            <label className="text-white flex-1">
              Unit
              <select
                value={group.draft.unit_id}
                onChange={(e) => updateDraft(index, "unit_id", e.target.value)}
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
                value={group.draft.ingredient_id}
                onChange={(e) => updateDraft(index, "ingredient_id", e.target.value)}
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
              onClick={() => addLine(index)}
              className="px-3 py-2 rounded bg-blue-500 text-white disabled:bg-gray-500"
              disabled={!group.draft.amount || !group.draft.unit_id || !group.draft.ingredient_id}
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
            {group.lines.map((line, lineIndex) => {
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
                    onClick={() => removeLine(index, lineIndex)}
                    className="px-2 py-1 rounded bg-white/10 text-white hover:bg-white/20"
                    title="Remove"
                  >
                    ✕
                  </button>

                  {/* Hidden inputs: THIS is what gets submitted */}
                  <input type="hidden" name="amounts" value={line.amount} />
                  <input type="hidden" name="unit_ids" value={line.unit_id} />
                  <input type="hidden" name="ingredient_ids" value={line.ingredient_id} />
                  <input type="hidden" name="group_names" value={group.group_name} />
                  <input type="hidden" name="positions" value={lineIndex} />

                </div>
              );
            })}
          </div>

          {/* Optional: show a message if no lines */}
          {group.lines.length === 0 && (
            <p className="text-white/70 text-sm">No ingredients added yet.</p>
          )}

          {groupsEnabled && (
            <>
              <button
                type="button"
                onClick={() => removeGroup(index)}
                disabled={groups.length <= 1}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove group
              </button>
            </>
          )}

        </div>
      ))}

      {groupsEnabled &&
        <button type="button" onClick={addGroup}>Add group</button>
      }

    </div>
  );
}