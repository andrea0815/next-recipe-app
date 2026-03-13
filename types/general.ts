export enum FormMode {
    EDIT = "edit",
    CREATE = "create",
}

export enum ItemType {
    INGREDIENT = "ingredient",
    UNIT = "unit",
    CATEGORY = "category",
}

export type SubmitButtonText = {
    default: string;
    pending: string;
}