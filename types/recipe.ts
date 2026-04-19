import type { Category } from "@/types/category";
import { Ingredient } from "./ingredient";
import { Unit } from "./unit";
import { ComponentType, ReactNode } from "react";
import IconAdd from "@/components/icons/IconAdd";
import { IconURL } from "next/dist/lib/metadata/types/metadata-types";

export type IngredientLineBase = {
    ingredient_id: string;
    unit_id: string;
    amount: number;
    position: number;
};

export type IngredientLineInput = IngredientLineBase & {
    group_name: string;
    owner_id: string;
    on_shopping_list?: boolean | null;
};

export type RecipeIngredient = IngredientLineInput & {
    id: string;
    ingredient: Ingredient;
    unit: Unit | null;
};

export type ShoppingListIngredientLine = {
    id: string;
    on_shopping_list?: boolean | null;
};

export type RecipeStepBase = {
    step_index: number;
    text: string;
    hint: string | null;
};

export type RecipeStep = RecipeStepBase & {
    recipe_id?: string;
};

export type RecipeBase = {
    id: string;
    name: string;
    slug: string;
    subtitle: string;
    is_public: boolean;
    image_uri: string | null;
    owner_id: string;
    portions: number;
    groups_enabled: boolean;
    username: string | null;
    heating_details_enabled: boolean;
    time: number | null;
    temperature: number | null;
    heating_mode: string | null;
};

export type Recipe = RecipeBase & {
    categories: Category[];
    ingredients: IngredientLineInput[];
    steps: RecipeStep[];
};

export type RecipeListItem = Pick<
    RecipeBase,
    "id" | "name" | "slug" | "subtitle" | "is_public" | "image_uri" | "owner_id"
> & {
    categories: Category[];
    username: string | null;
};

export type RecipeLineDraft = {
    amount: number;
    unit_id: string;
    ingredient_id: string;
};

export type RecipeGroupDraft = {
    group_name: string;
    draft: RecipeLineDraft;
    lines: RecipeLineDraft[];
};

export type RecipeStepDraft = Omit<RecipeStepBase, "hint"> & {
    hint: string;
    hint_is_showing: boolean;
};

export type RecipeDraft = Pick<
    RecipeBase,
    "id" | "name" | "subtitle" | "slug" | "image_uri" | "is_public" | "portions" | "groups_enabled" | "heating_details_enabled" | "time" | "temperature" | "heating_mode"
> & {
    category_ids: string[];
    groups: RecipeGroupDraft[];
    steps: RecipeStepDraft[];
};

export type RecipeFields = {
    name?: string;
    subtitle?: string;
    image_uri?: string;
    category_ids?: string;
    ingredient_ids?: string;
    group_names?: string;
    portions?: string;
    unit_ids?: string;
    amounts?: string;
    text?: string;
    hint?: string;
    form?: string;
    heating_details_enabled?: string;
    time?: string;
    temperature?: string;
    heating_mode?: string;
};

export enum HeatingMode {
    TOP_BOTTOM_HEAT = "top_bottom_heat", // Ober-Unterhitze
    CONVECTION = "convection", // Heißluft
    FAN_ASSISTED = "fan_assisted", // Umluft
    GRILL = "grill", // Grill
    TOP_HEAT = "top_heat", // Oberhitze
    BOTTOM_HEAT = "bottom_heat", // Unterhitze
    DEFROST = "defrost", // Auftauen
}

export type HeatingMeta = {
    id: string;
    name: string;
    icon: ComponentType<{ size?: number; className?: string }>;
};

export const HEATING_META: Record<HeatingMode, HeatingMeta> = {
    [HeatingMode.TOP_BOTTOM_HEAT]: {
        id: "1",
        name: "Ober-Unterhitze",
        icon: IconAdd,
    },
    [HeatingMode.CONVECTION]: {
        id: "2",
        name: "Heißluft",
        icon: IconAdd,
    },
    [HeatingMode.DEFROST]: {
        id: "3",
        name: "Auftauen",
        icon: IconAdd,
    },
    [HeatingMode.FAN_ASSISTED]: {
        id: "4",
        name: "Umluft",
        icon: IconAdd,
    },
    [HeatingMode.GRILL]: {
        id: "5",
        name: "Grill",
        icon: IconAdd,
    },
    [HeatingMode.TOP_HEAT]: {
        id: "6",
        name: "Oberhitze",
        icon: IconAdd,
    },
    [HeatingMode.BOTTOM_HEAT]: {
        id: "7",
        name: "Unterhitze",
        icon: IconAdd,
    },
};