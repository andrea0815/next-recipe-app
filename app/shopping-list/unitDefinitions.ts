
export const UNIT_DEFINITIONS = [
  { aliases: ["g", "gram", "grams"], family: "weight", toBase: 1, baseUnit: "g" },
  { aliases: ["kg", "kilogram", "kilograms"], family: "weight", toBase: 1000, baseUnit: "g" },
  { aliases: ["ml", "milliliter", "milliliters", "millilitre", "millilitres"], family: "volume", toBase: 1, baseUnit: "ml" },
  { aliases: ["l", "liter", "liters", "litre", "litres"], family: "volume", toBase: 1000, baseUnit: "ml" },
  { aliases: ["tsp", "teaspoon", "teaspoons"], family: "volume", toBase: 5, baseUnit: "ml" },
  { aliases: ["tbsp", "tablespoon", "tablespoons"], family: "volume", toBase: 15, baseUnit: "ml" },
  { aliases: ["cup", "cups"], family: "volume", toBase: 240, baseUnit: "ml" },
  { aliases: ["piece", "pieces", "pc", "pcs", "x"], family: "count", toBase: 1, baseUnit: "piece" },
];