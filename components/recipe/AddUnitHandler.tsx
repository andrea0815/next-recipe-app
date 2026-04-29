import React, { RefObject } from 'react';
import { use, useState } from 'react';
import { PanelRef } from '../ingredient/IngredientPanel';
import { FormMode, ItemType } from '@/types/general';
import UnitPanel from '../unit/UnitPanel';
import { Unit } from '@/types/unit';


export default function AddUnitHandler({ unitsPromise, panelRef }:
    {
        panelRef: RefObject<PanelRef | null>;
        unitsPromise: Promise<Unit[]>;
    }) {

    const initialUnits = use(unitsPromise)

    // Units
    const [units, setUnits] = useState<Unit[]>(initialUnits);
    const [selectedUnitId, setSelectedUnitId] = useState("");

    return (
        <UnitPanel
            ref={panelRef}
            mode={FormMode.CREATE}
            type={ItemType.UNIT}
            onCreated={(unit) => {
                setUnits((prev) => [...prev, unit]);
                setSelectedUnitId(unit.id);
            }}
        />
    );
}
