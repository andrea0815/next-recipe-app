"use server"

import { removeUnit } from "@/actions/units";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getUnits } from "@/lib/db/units";

import type { Unit } from '@/types/unit';

import { ItemType } from "@/types/general"
import ListSection from '@/components/general/ListSection';
import PageHeadline from "@/components/typography/PageHeadline";
import GeneralSection from "@/components/containers/GeneralSection";

export default async function UnitsPage() {
    const user = await getCurrentDbUser();

    const units: Unit[] = await getUnits(undefined, user?.id ?? undefined);

    const preparedUnits = units.map((item) => ({
        id: item.id,
        editHref: `/profile/units/${item.id}/edit`,
        textItems: [item.name, item.plural || "–", item.abbreviation || "–"],
    }));

    return (
        <GeneralSection>
            <PageHeadline>Units</PageHeadline>
            <ListSection items={preparedUnits} removeItem={removeUnit} type={ItemType.UNIT} />
        </GeneralSection>
    );
}

