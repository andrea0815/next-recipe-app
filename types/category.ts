export type Category = {
    id: string;
    name: string;
    owner_id: string | null;
}

export type CategoryDraft = {
    id: string;
    name: string;
    owner_id: string | null;
}

export type CategoryFields = {
    name: string;
}