"use client";

import { useOptimistic } from "react";
import { removeUnit } from "@/actions/units";

import type { Unit } from '@/types/unit';

import ListItem from "../general/ListItem";

export default function UnitItems({ units }: { units: Unit[] }) {

    const [optimisticUnits, setOptimisticUnits] = useOptimistic(
        units,
        (currentUnits, unitId) => {
            return currentUnits.filter(unit => unit.id !== unitId);
        }
    );

    const removeUnitById = async (recipeId: string) => {
        setOptimisticUnits(recipeId);
        await removeUnit(recipeId);
    }

    return (
        <ul className="flex flex-col">
            <li>
                Add new Unit
            </li>
            {optimisticUnits.map((unit) => (

                <ListItem
                    key={unit.id}
                    id={unit.id}
                    editHref={`/units/${unit.id}/edit`}
                    onDeleteAction={removeUnitById.bind(null, unit.id)}
                    textItems={[unit.name, unit.plural || "–", unit.abbreviation || "–"]}
                />

            ))}
        </ul>
    );
}
