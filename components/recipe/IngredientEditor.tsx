"use client";

import { useMemo } from "react";
import type { Unit } from "@/types/unit";
import type { Ingredient } from "@/types/ingredient";
import type { RecipeGroupDraft, RecipeLineDraft, IngredientLineInput } from "@/types/recipe";

import UnitDisplay from "@/components/unit/UnitDisplay";
import InrgredientDisplay from "@/components/ingredient/InrgredientDisplay";
import InputFieldText from "@/components/form/InputFieldText";
import InputWrapper from "../form/InputWrapper";
import Switch from "../form/Switch";
import Button from "../buttons/Button";
import InputFieldNumber from "../form/InputFieldNumber";
import InputSelect from "../form/InputSelect";

export default function IngredientEditor({
  state,
  ingredients,
  units,
  groups,
  groupsEnabled,
  onGroupsChange,
  onGroupsEnabledChange,
}: {
  state: any; // your FormState (keep as any for now)
  ingredients: Ingredient[];
  units: Unit[];
  groups: RecipeGroupDraft[],
  groupsEnabled: boolean,
  onGroupsChange: (groups: RecipeGroupDraft[]) => void,
  onGroupsEnabledChange: (enabled: boolean) => void,
}) {


  const unitById = useMemo(
    () => new Map(units.map((u) => [u.id, u])),
    [units]
  );
  const ingredientById = useMemo(
    () => new Map(ingredients.map((i) => [i.id, i])),
    [ingredients]
  );

  function addLine(groupIndex: number) {
    onGroupsChange(
      groups.map((group, i) => {
        if (i !== groupIndex) return group;

        const { draft } = group;
        if (!draft.amount || !draft.unit_id || !draft.ingredient_id) {
          return group;
        }

        return {
          ...group,
          lines: [...group.lines, draft],
          draft: { amount: 1, unit_id: "", ingredient_id: "" },
        };
      })
    );
  }

  function removeLine(groupIndex: number, lineIndex: number) {
    onGroupsChange(
      groups.map((group, i) =>
        i === groupIndex
          ? {
            ...group,
            lines: group.lines.filter((_, li) => li !== lineIndex),
          }
          : group
      )
    );
  }

  function updateDraft<K extends keyof RecipeLineDraft>(
    groupIndex: number,
    field: K,
    value: RecipeLineDraft[K]
  ) {
    onGroupsChange(
      groups.map((group, i) =>
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
    onGroupsChange([
      ...groups,
      {
        group_name: "",
        draft: { amount: 1, unit_id: "", ingredient_id: "" },
        lines: [],
      },
    ]);
  }

  function removeGroup(index: number) {
    if (groups.length <= 1) return;

    onGroupsChange(groups.filter((_, i) => i !== index));
  }

  function updateGroupName(index: number, value: string) {
    onGroupsChange(
      groups.map((group, i) =>
        i === index ? { ...group, group_name: value } : group
      )
    );
  }


  return (
    <div className="space-y-3 flex flex-col justify-center">

      <InputWrapper labelName="Groups enabled">
        <Switch
          checked={groupsEnabled}
          name="groups_enabled"
          onChange={(checked) => onGroupsEnabledChange(checked)}
        />

      </InputWrapper>

      {(groupsEnabled ? groups : [groups[0]]).map((group, index) => (
        <div key={index} className="bg-gray-300 p-4 rounded-2xl flex flex-col">

          {groupsEnabled &&

            <div className="border-b border-b-gray-500 pb-6 mb-4">

              <InputFieldText<RecipeGroupDraft, "group_name">
                field="group_name"
                name="all_group_names"
                labelName="Group Name"
                draftValue={group.group_name}
                updateDraftValue={(_, value) => updateGroupName(index, value)}
                placeholder="Group Name"
                error={state?.errors?.group_names}
              />
            </div>
          }

          <div className="mb-4 flex flex-col gap-2">
            {/* Draft input row */}
            <div className="flex gap-2 items-end justify-between">

              <InputFieldNumber<RecipeLineDraft, "amount">
                labelName="Amount"
                field="amount"
                draftValue={group.draft.amount}
                updateDraftValue={(_, value) => updateDraft(index, "amount", value)}
                min={0}
                step={0.1}
                error={state?.errors?.amounts}
                customClass="w-[10%] min-w-15 flex-shrink"
              />

              <InputSelect<RecipeLineDraft, "unit_id", typeof units[number]>
                items={units}
                field="unit_id"
                labelName="Unit"
                draftValue={group.draft.unit_id}
                updateDraftValue={(_, value) => updateDraft(index, "unit_id", value)}
                customClass="w-[20%] flex-shrink"
              />

              <InputSelect<RecipeLineDraft, "ingredient_id", typeof ingredients[number]>
                items={ingredients}
                field="ingredient_id"
                labelName="Ingredient"
                draftValue={group.draft.ingredient_id}
                updateDraftValue={(_, value) => updateDraft(index, "ingredient_id", value)}
                customClass="flex-1 min-w-0"
                error=""
              />
             


              <Button
                onClick={() => addLine(index)}
                disabled={!group.draft.amount || !group.draft.unit_id || !group.draft.ingredient_id}
                priority="secondary"
                size="small"
              >Add</Button>
            </div>


            {/* Added lines list */}
            <div className="">
              {group.lines.map((line, lineIndex) => {
                const unit = unitById.get(line.unit_id);
                const ing = ingredientById.get(line.ingredient_id);

                return (
                  <div
                    key={`${line.ingredient_id}-${line.unit_id}-${index}`}
                    className="flex items-center justify-between gap-2 p-2 border-b border-gray-400 last-of-type:border-b-0"
                  >
                    <div className="text-text">
                      <span className="font-semibold">{line.amount}</span>{" "}
                      <UnitDisplay amount={Number(line.amount)} unit={unit} />{" "}
                      <InrgredientDisplay amount={Number(line.amount)} ingredient={ing} />
                    </div>

                    <button
                      type="button"
                      onClick={() => removeLine(index, lineIndex)}
                      className="px-2 py-1 rounded bg-white/10 text-text hover:bg-white/20 cursor-pointer"
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

          </div>

          {/* Optional: show a message if no lines */}
          {group.lines.length === 0 && (
            <p className="text-text/70 text-sm text-center m-6">No ingredients added yet.</p>
          )}

          {groupsEnabled && (
            <>
              <Button
                onClick={() => removeGroup(index)}
                disabled={groups.length <= 1}
                priority="tertiary"
              >
                Remove group
              </Button>
            </>
          )}

        </div>
      ))}

      {groupsEnabled &&
        <Button
          onClick={addGroup}
          priority="secondary"
          customClass="self-end"
          size="small"
        >Add Group</Button>
      }

      {(state?.errors?.amounts ||
        state?.errors?.unit_ids ||
        state?.errors?.ingredient_ids ||
        state?.errors?.group_names) && (
          <div className="space-y-1">
            {state.errors.amounts && <p className="text-red-500">{state.errors.amounts}</p>}
            {state.errors.unit_ids && <p className="text-red-500">{state.errors.unit_ids}</p>}
            {state.errors.ingredient_ids && <p className="text-red-500">{state.errors.ingredient_ids}</p>}
            {state.errors.group_names && <p className="text-red-500">{state.errors.group_names}</p>}
          </div>
        )}
    </div>
  );
}