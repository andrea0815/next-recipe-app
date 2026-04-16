type UnitFamily = "weight" | "volume" | "count";

type UnitDefinition = {
  aliases: string[];
  family: UnitFamily;
  toBase: number;
  baseUnit: string;
};

export const UNIT_DEFINITIONS: UnitDefinition[] = [
  { aliases: ["g", "gram", "grams", "gramm"], family: "weight", toBase: 1, baseUnit: "g" },
  { aliases: ["kg", "kilogram", "kilogramm", "kilograms"], family: "weight", toBase: 1000, baseUnit: "g" },
  { aliases: ["ml", "milliliter", "milliliters", "millilitre", "millilitres"], family: "volume", toBase: 1, baseUnit: "ml" },
  { aliases: ["l", "liter", "liters", "litre", "litres"], family: "volume", toBase: 1000, baseUnit: "ml" },
  { aliases: ["tl", "teelöffel", "tsp", "teaspoon", "teaspoons"], family: "volume", toBase: 5, baseUnit: "ml" },
  { aliases: ["el", "esslöffel", "tbsp", "tablespoon", "tablespoons"], family: "volume", toBase: 15, baseUnit: "ml" },
  { aliases: ["becher", "cup", "cups"], family: "volume", toBase: 240, baseUnit: "ml" },
  { aliases: ["stk", "stück", "piece", "pieces", "pc", "pcs", "x"], family: "count", toBase: 1, baseUnit: "piece" },
];