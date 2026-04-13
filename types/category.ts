export type Category = {
    id: string;
    name: string;
    owner_id: string | null;
}

export type CategoryDraft = {
    id: string;
    name: string;
}

export type CategoryFields = {
    name: string;
}

export type CategoryPayload = {
    id: string;
    name: string;
};