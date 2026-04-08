export type Ingredient = {
    id: string;
    name: string;
    plural: string | null;
    owner_id?: string | null;
}

export type IngredientDraft = {
    id: string;
    name: string;
    plural: string | null;
}

export type IngredientFields = {
    id?: string;
    name: string;
    plural: string;
};

export type IngredientPayload = {
    id: string;
    name: string;
    plural: string;
};

export type IngredientListItem = {
    id: string;
    editHref: string;
    textItems: string[];
};

export type CreatedIngredient = {
    id: string;
    name: string;
    plural?: string | null;
};