export type CreateUserInput = {
    clerk_user_id: string;
    email: string;
    name: string;
    username?: string | null;
};

export type UpdateUserInput = {
    email?: string;
    name?: string;
    username?: string | null;
    recipe_public_by_default?: boolean | null;
    clerk_user_id?: string;
};

export type UserFieldErrors = {
    email?: string;
    name?: string;
    username?: string;
    recipe_public_by_default?: string;
    clerk_user_id?: string;
};