import type { ShoppingItem, ShoppingListEntry } from "@/types/shoppingList";
import { UNIT_DEFINITIONS } from "./unitDefinitions";

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

function getAmountInBaseUnit(item: ShoppingItem) {
  const scaledAmount = getScaledAmount(item);
  const def = getUnitDefinition(item.unit);

  if (!def) {
    return {
      amount: scaledAmount,
      family: null,
      unitLabel:
        item.unit?.abbreviation?.trim() ||
        item.unit?.name?.trim() ||
        "",
    };
  }

  return {
    amount: scaledAmount * def.toBase,
    family: def.family,
    unitLabel: def.baseUnit,
  };
}

function formatAmountFromBase(
  amountInBase: number,
  family: "weight" | "volume" | "count" | null,
  fallbackUnitLabel: string
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

  if (family === "count") {
    return { amount: round(amountInBase), unit: "piece" };
  }

  return {
    amount: round(amountInBase),
    unit: fallbackUnitLabel,
  };
}

export function getSortedItems(items: ShoppingItem[]): ShoppingListEntry[] {
  const grouped = new Map<string, ShoppingItem[]>();

  for (const item of items) {
    const ingredientId = item.ingredient.id;
    const def = getUnitDefinition(item.unit);

    const unitKey = def
      ? `${def.family}__${def.baseUnit}`
      : `raw__${normalizeUnitName(item.unit) ?? "no-unit"}`;

    const key = `${ingredientId}__${unitKey}`;

    const current = grouped.get(key) ?? [];
    current.push(item);
    grouped.set(key, current);
  }

  const result: ShoppingListEntry[] = [];

  for (const [, groupItems] of grouped) {
    const first = groupItems[0];
    const firstDef = getUnitDefinition(first.unit);

    if (groupItems.length === 1) {
      const converted = getAmountInBaseUnit(first);
      const formatted = formatAmountFromBase(
        converted.amount,
        converted.family,
        converted.unitLabel
      );

      result.push({
        type: "single",
        item: first,
        totalAmount: formatted.amount,
        sharedUnit: formatted.unit,
      });

      continue;
    }

    const totalAmountInBase = groupItems.reduce((sum, item) => {
      const converted = getAmountInBaseUnit(item);
      return sum + converted.amount;
    }, 0);

    const formatted = formatAmountFromBase(
      totalAmountInBase,
      firstDef?.family ?? null,
      first.unit?.abbreviation ?? first.unit?.name ?? ""
    );

    result.push({
      type: "group",
      ingredientId: first.ingredient.id,
      ingredientName: first.ingredient.name,
      totalAmount: formatted.amount,
      sharedUnit: formatted.unit,
      items: groupItems,
    });
  }

  return result.sort(sortEntries);
}