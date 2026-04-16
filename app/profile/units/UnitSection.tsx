"use client";

import { useState, useRef } from "react";
import { removeUnit } from "@/actions/units";

import type { PanelRef } from "@/components/unit/UnitPanel";
import type { UnitDraft } from "@/types/unit";
import type { ListItem } from "@/types/general";
import { FormMode, ItemType } from "@/types/general";

import ListSection from "@/components/general/ListSection";
import PageHeadline from "@/components/typography/PageHeadline";
import UnitPanel from "@/components/unit/UnitPanel";
import ListAddButton from "@/components/general/ListAddButton";

export default function UnitSection({
    preparedUnits,
}: {
    preparedUnits: ListItem[];
}) {
    const [displayed, setDisplayed] = useState<ListItem[]>(preparedUnits);
    const [selectedUnit, setSelectedUnit] = useState<UnitDraft | null>(null);
    const [panelFormMode, setpanelFormMode] = useState<FormMode>(FormMode.CREATE);
    const UnitPanelRef = useRef<PanelRef>(null);

    function prepareUnit(item: UnitDraft): ListItem {
        return {
            id: item.id,
            editHref: `/profile/units/${item.id}/edit`,
            textItems: [
                { key: "name", value: item.name },
                { key: "plural", value: item.plural || "–" },
                { key: "abbreviation", value: item.abbreviation || "–" },
            ],
        };
    }

    return (
        <div className="w-full max-w-200 flex flex-col items-center">
            <PageHeadline>Units</PageHeadline>

            <ListAddButton
                type={ItemType.UNIT}
                onPress={() => {
                    setpanelFormMode(FormMode.CREATE);
                    setSelectedUnit(null);
                    UnitPanelRef.current?.open();
                }}
            />

            <ListSection
                items={displayed}
                removeItem={removeUnit}
                type={ItemType.UNIT}
                onEditButton={(item) => {
                    setpanelFormMode(FormMode.EDIT);
                    setSelectedUnit({
                        id: item.id,
                        name: item.textItems.find((t) => t.key === "name")?.value || "",
                        plural: item.textItems.find((t) => t.key === "plural")?.value || "",
                        abbreviation: item.textItems.find((t) => t.key === "abbreviation")?.value || "",
                    });

                    UnitPanelRef.current?.open();
                }}
            />

            <UnitPanel
                ref={UnitPanelRef}
                mode={panelFormMode}
                type={ItemType.UNIT}
                initialDraft={{
                    id: selectedUnit?.id || "",
                    name: selectedUnit?.name || "",
                    plural: selectedUnit?.plural || "",
                    abbreviation: selectedUnit?.abbreviation || "",
                }}
                onCreated={(unit) => {
                    setDisplayed((prev) => [...prev, prepareUnit(unit)]);
                    setSelectedUnit(unit);
                }}
            />
        </div>
    );
}