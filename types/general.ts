export enum FormMode {
    EDIT = "edit",
    CREATE = "create",
}

// item type

export enum ItemType {
    INGREDIENT = "ingredient",
    UNIT = "unit",
    CATEGORY = "category",
}

export enum RecipeListType {
    EXPLORE = "explore",
    COLLECTION = "collection",
}

type ItemMeta = {
    name: string;
    plural: string;
};

export const ITEM_META: Record<ItemType, ItemMeta> = {
    [ItemType.INGREDIENT]: {
        name: "ingredient",
        plural: "ingredients",
    },
    [ItemType.UNIT]: {
        name: "unit",
        plural: "units",
    },
    [ItemType.CATEGORY]: {
        name: "category",
        plural: "categories",
    },
};

// 

export type SubmitButtonText = {
    default: string;
    pending: string;
}

export type TextItem = {
    key: "name" | "plural" | "abbreviation";
    value: string;
};

export type ListItem = {
    id: string;
    editHref: string;
    textItems: TextItem[];
};

export type PaginatedResult<T> = {
    items: T[];
    nextCursor: string | null;
    hasMore: boolean;
};