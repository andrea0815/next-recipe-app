export type Ingredient = {
    id: string;
    name: string;
    plural: string | null;
    owner_id: string | null;
}

export type IngredientDraft = {
    id: string;
    name: string;
    plural: string | null;
}

export type IngredientFields = {
    name: string;
    plural: string;
};