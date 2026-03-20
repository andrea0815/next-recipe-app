"use client";

import { useOptimistic } from "react";
import { removeUnit } from "@/actions/units";

import type { Unit } from '@/types/unit';
import Link from "next/link";
import Form from "next/form";

export default function UnitItems({ units }: { units: Unit[] }) {

    const [optimisticUnits, setOptimisticUnits] = useOptimistic(
        units,
        (currentUnits, unitId) => {
            return currentUnits.filter(unit => unit.id !== unitId);
        }
    );

    const removeRecipeById = async (recipeId: string) => {
        setOptimisticUnits(recipeId);
        await removeUnit(recipeId);
    }

    return (
        <div>
            <h2 className="text-md font-bold">Units</h2>
            <ul className="">
                {optimisticUnits.map((unit) => (
                    <li
                        key={unit.id}
                        className=""
                    >
                        <Link href={`/units/${unit.id}/edit`}>
                            <p className="text-sm">
                                {unit.name} – {unit.abbreviation}
                            </p>
                        </Link>

                        <Form action={removeRecipeById.bind(null, unit.id)}>
                            <button
                                type="submit"
                                className="p-2 text-white bg-red-500 rounded disabled:bg-gray-500"
                            >
                                Delete
                            </button>
                        </Form>
                    </li>
                ))}
            </ul>
        </div>
    );
}
