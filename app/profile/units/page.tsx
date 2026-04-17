"use server"

import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getUnits } from "@/lib/db/units";

import type { Unit } from '@/types/unit';
import type { ListItem } from '@/types/general';

import UnitSection from "./UnitSection";

export default async function UnitsPage() {
  const user = await getCurrentDbUser();

  if (!user) {
    throw new Error("You must be signed in.");
  }

  const units: Unit[] = await getUnits(undefined, user?.id ?? undefined);

  function prepareUnit(item: Unit): ListItem {
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

  const preparedUnits: ListItem[] = [...units]
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
    .map(prepareUnit);

  return (
    <>
      <UnitSection
        preparedUnits={preparedUnits}
      />
    </>
  );


}


