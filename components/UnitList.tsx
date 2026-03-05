import React from 'react';
import { getUnits } from "@/lib/db/units";
import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import UnitItems from './UnitIttems';
import type { Unit } from '@/types/unit';

export default async function RecipeList() {

  const user = await getCurrentDbUser();

  const units: Unit[] = await getUnits(undefined, user?.id ?? undefined);

  return (
    <UnitItems units={units}></UnitItems>
  );
}
