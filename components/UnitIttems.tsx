"use client";

import { useOptimistic } from "react";

import type { Unit } from '@/types/unit';

export default function UnitItems({ units }: { units: Unit[] }) {

    const [optimisticUnits, setOptimisticUnits] = useOptimistic(
        units,
        (currentUnits, unitId) => {
            return currentUnits.filter(unit => unit.id !== unitId);
        }
    );

    return (
        <div>
            <h2 className="text-md font-bold">Units</h2>
            <ul className="">
                {optimisticUnits.map((unit) => (
                    <li
                        key={unit.id}
                        className=""
                    >
                        <p className="text-sm">
                            {unit.name} –   {unit.abbreviation}
                        </p>

                    </li>
                ))}
            </ul>
        </div>
    );
}
