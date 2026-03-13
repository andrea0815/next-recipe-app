export type Unit = {
    id: string;
    name: string;
    plural: string | null;
    abbreviation: string | null;
    owner_id: string | null;
}

export type UnitDraft = {
    id: string;
    name: string;
    plural: string | null;
    abbreviation: string | null;
}