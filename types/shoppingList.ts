import { Recipe } from "@/types/recipe";
import { Unit } from "@/types/unit";
import { Ingredient } from "./ingredient";

export type ShoppingItemDraft = {
    id?: string,
    portions: number,
    recipe_id: string,
    recipe_ingredient_id: string,
    owner_id: string,
}

export type ShoppingItemFields = {
    id?: string,
    portions: string,
    recipe_id: string,
    recipe_ingredient_id: string,
    owner_id: string,
}

// For Shopping List Display


export type ShoppingItem = {
    id: string;
    portions: number;
    amount: number;
    owner_id: string;
    unit: any;
    ingredient: any;
    recipe: any;
};

export type SingleListEntry = {
    type: "single";
    totalAmount: number;
    sharedUnit: string;
    item: ShoppingItem;
};

export type GroupListEntry = {
    type: "group";
    ingredientId: string;
    ingredientName: string;
    totalAmount: number;
    sharedUnit: string;
    items: ShoppingItem[];
};

export type ShoppingListEntry = SingleListEntry | GroupListEntry;