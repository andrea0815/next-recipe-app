"use client";

import Switch from "@/components/form/Switch";
import { editUserPreference } from "@/actions/users";
import { useTransition } from "react";

export default function ProfileSettingsClient({
    recipePublicByDefault,
}: {
    recipePublicByDefault: boolean;
}) {
    const [isPending, startTransition] = useTransition();

    function onPublicChange(value: boolean) {
        startTransition(async () => {
            await editUserPreference(value);
        });
    }

    return (
        <ul className="w-full border-t border-gray-300">
            <li className="py-3 flex justify-between items-center w-full border-b border-gray-300">
                <p>Recipes are public by default:</p>
                <Switch
                    checked={recipePublicByDefault}
                    name="is_public"
                    onChange={onPublicChange}
                    disabled={isPending}
                />
            </li>
        </ul>
    );
}