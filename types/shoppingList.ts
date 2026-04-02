export type ShoppingItem = {
  id: string;
  amount: number;
  unit: {
    id: string;
    name: string;
    abbreviation: string | null;
    plural: string | null;
  } | null;
  ingredient: {
    id: string;
    name: string;
    plural: string | null;
  };
  on_shopping_list: boolean;
};

export type SingleListEntry = {
  type: "single";
  item: ShoppingItem;
};

export type GroupListEntry = {
  type: "group";
  ingredientId: string;
  ingredientName: string;
  unitFamily: string;
  totalAmount: number;
  displayUnit: string;
  items: ShoppingItem[];
  on_shopping_list: boolean;
};

export type ShoppingListEntry = SingleListEntry | GroupListEntry;

export type UnitDefinition = {
  aliases: string[];
  family: "weight" | "volume" | "count";
  toBase: number;
  baseUnit: string;
};