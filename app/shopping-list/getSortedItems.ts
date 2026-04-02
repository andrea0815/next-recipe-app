import type { ShoppingItem, ShoppingListEntry } from "@/types/shoppingList";
import { UNIT_DEFINITIONS } from "./unitDefinitions";


export function getSortedItems(items: ShoppingItem[]): ShoppingListEntry[] {
  const grouped = new Map<string, ShoppingItem[]>();
  const singlesWithoutKnownUnit: ShoppingListEntry[] = [];

  for (const item of items) {
    const ingredientId = item.ingredient.id;
    const unitDef = getUnitDefinition(item.unit);

    if (!unitDef) {
      singlesWithoutKnownUnit.push({
        type: "single",
        item,
      });
      continue;
    }

    const key = `${ingredientId}__${unitDef.family}`;
    const current = grouped.get(key) ?? [];
    current.push(item);
    grouped.set(key, current);
  }

  const result: ShoppingListEntry[] = [];

  for (const [, groupItems] of grouped) {
    if (groupItems.length === 1) {
      result.push({
        type: "single",
        item: groupItems[0],
      });
      continue;
    }

    const first = groupItems[0];
    const unitDef = getUnitDefinition(first.unit);

    if (!unitDef) {
      result.push({
        type: "single",
        item: first,
      });
      continue;
    }

    const totalInBaseUnit = groupItems.reduce((sum, item) => {
      const def = getUnitDefinition(item.unit);
      if (!def) return sum;
      return sum + Number(item.amount) * def.toBase;
    }, 0);

    const { amount, unit } = formatAmountFromBase(
      totalInBaseUnit,
      unitDef.family,
      first.unit
    );

    result.push({
      type: "group",
      ingredientId: first.ingredient.id,
      ingredientName: first.ingredient.name,
      unitFamily: unitDef.family,
      totalAmount: amount,
      displayUnit: unit,
      items: groupItems,
      on_shopping_list: groupItems.some((item) => item.on_shopping_list),
    });
  }

  result.push(...singlesWithoutKnownUnit);

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