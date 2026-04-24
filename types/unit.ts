export type Unit = {
    id: string;
    name: string;
    plural: string | null;
    abbreviation: string | null;
    owner_id?: string | null;
}

export type UnitDraft = {
    id: string;
    name: string;
    plural: string | null;
    abbreviation: string | null;
}

export type UnitFields = {
    name: string;
    plural: string | null;
    abbreviation: string | null;
}

export type UnitFieldErrors = {
    name?: string;
    plural?: string;
    abbreviation?: string;
};

export type UnitPayload = {
    id: string;
    name: string;
    plural: string | null;
    abbreviation: string | null;
};