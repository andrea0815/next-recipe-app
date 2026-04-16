import type { ShoppingItem, ShoppingListEntry } from "@/types/shoppingList";
import { UNIT_DEFINITIONS } from "./unitDefinitions";

// export type ShoppingItem = {
//     id: string,
//     portions: number,
//     amount: number,
//     owner_id: string,
//     unit: any,
//     ingredient: any,
//     recipe: any
// }

// export type SingleListEntry = {
//     type: "single";
//     totalAmount: number;
//     item: ShoppingItem;
// };

// type GroupListEntry = {
//     type: "group";
//     ingredientId: string;
//     ingredientName: string;
//     totalAmount: number;
//     sharedUnit: string;
//     items: ShoppingItem[];
// };

// export type ShoppingListEntry = SingleListEntry | GroupListEntry;

// export const UNIT_DEFINITIONS = [
//   { aliases: ["g", "gram", "grams", "gramm"], family: "weight", toBase: 1, baseUnit: "g" },
//   { aliases: ["kg", "kilogram", "kilogramm", "kilograms"], family: "weight", toBase: 1000, baseUnit: "g" },
//   { aliases: ["ml", "milliliter", "milliliters", "millilitre", "millilitres"], family: "volume", toBase: 1, baseUnit: "ml" },
//   { aliases: ["l", "liter", "liters", "litre", "litres"], family: "volume", toBase: 1000, baseUnit: "ml" },
//   { aliases: ["TL", "Teelöffel", "tsp", "teaspoon", "teaspoons"], family: "volume", toBase: 5, baseUnit: "ml" },
//   { aliases: ["EL", "Esslöffel", "tbsp", "tablespoon", "tablespoons"], family: "volume", toBase: 15, baseUnit: "ml" },
//   { aliases: ["Becher", "cup", "cups"], family: "volume", toBase: 240, baseUnit: "ml" },
//   { aliases: ["Stk", "Stück", "piece", "pieces", "pc", "pcs", "x"], family: "count", toBase: 1, baseUnit: "piece" },
// ];

export function getSortedItems(items: ShoppingItem[]): ShoppingListEntry[] {

    const result: ShoppingListEntry[] = [];

    





    result.push({
        type: "group",
        ingredientId: "",
        ingredientName: "first.ingredient.name",
        totalAmount: 0,
        sharedUnit: "",
        items: items
    });

    return result;
}
