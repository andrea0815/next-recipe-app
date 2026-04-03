import type { ShoppingItem, ShoppingListEntry } from "@/types/shoppingList";
import { UNIT_DEFINITIONS } from "./unitDefinitions";

export type ShoppingItem2 = {
  id: string,
  portions: number,
  amount: number,
  owner_id: string,
  unit: any,
  ingredient: any,
  recipe: any
}

export function getSortedItems(items: ShoppingItem[]): ShoppingListEntry[] {
  const grouped = new Map<string, ShoppingItem[]>();

  for (const item of items) {
    const ingredientId = item.ingredient.id;
    const unitId = item.unit?.id ?? "no-unit";

    const key = `${ingredientId}__${unitId}`;

    const current = grouped.get(key) ?? [];
    current.push(item);
    grouped.set(key, current);
  }

  const result: ShoppingListEntry[] = [];

  for (const [, groupItems] of grouped) {
    if (groupItems.length === 1) {
      const item = groupItems[0];

      result.push({
        type: "single",
        item,
        totalAmount: getScaledAmount(item), 
      });

      continue;
    }

    const first = groupItems[0];
    const totalAmount = groupItems.reduce((sum, item) => {
      const recipePortions = Number(item.recipe.portions ?? 0);
      const itemAmount = Number(item.amount ?? 0);
      const selectedPortions = Number(item.portions ?? 0);

      if (recipePortions <= 0) return sum;

      return sum + (itemAmount / recipePortions) * selectedPortions;
    }, 0);

    result.push({
      type: "group",
      ingredientId: first.ingredient.id,
      ingredientName: first.ingredient.name,
      totalAmount,
      sharedUnit: first.unit?.abbreviation ?? first.unit?.name ?? "",
      items: groupItems
    });
  }

  return result.sort(sortEntries);
}

function normalizeUnitName(unit: ShoppingItem["unit"]) {
  if (!unit) return null;

  return (
    unit.abbreviation?.trim().toLowerCase() ||
    unit.name?.trim().toLowerCase() ||
    null
  );
}

function getUnitDefinition(unit: ShoppingItem["unit"]) {
  const normalized = normalizeUnitName(unit);
  if (!normalized) return null;

  return (
    UNIT_DEFINITIONS.find((def) => def.aliases.includes(normalized)) ?? null
  );
}

function formatAmountFromBase(
  amountInBase: number,
  family: "weight" | "volume" | "count",
  originalUnit: ShoppingItem["unit"]
) {
  if (family === "weight") {
    if (amountInBase >= 1000) {
      return { amount: round(amountInBase / 1000), unit: "kg" };
    }
    return { amount: round(amountInBase), unit: "g" };
  }

  if (family === "volume") {
    if (amountInBase >= 1000) {
      return { amount: round(amountInBase / 1000), unit: "l" };
    }
    return { amount: round(amountInBase), unit: "ml" };
  }

  return {
    amount: round(amountInBase),
    unit: normalizeUnitName(originalUnit) ?? "piece",
  };
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function sortEntries(a: ShoppingListEntry, b: ShoppingListEntry) {
  const nameA =
    a.type === "group" ? a.ingredientName : a.item.ingredient.name;
  const nameB =
    b.type === "group" ? b.ingredientName : b.item.ingredient.name;

  return nameA.localeCompare(nameB);
}

function getScaledAmount(item: ShoppingItem) {
  const recipePortions = Number(item.recipe.portions ?? 0);
  const itemAmount = Number(item.amount ?? 0);
  const selectedPortions = Number(item.portions ?? 0);

  if (recipePortions <= 0) return 0;

  return (itemAmount / recipePortions) * selectedPortions;
}