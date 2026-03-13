import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getUnit } from "@/lib/db/units";
import { notFound } from "next/navigation";

import { Unit } from "@/types/unit";
import Navbar from '@/components/nav/Navbar';
import UnitForm from "@/components/unit/UnitForm";

export default async function EditUnitPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const user = await getCurrentDbUser();

  if (!user) {
    notFound();
  }
  const unit: Unit | null = await getUnit(id)

  if (!unit) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <UnitForm unit={unit} />
    </>
  );
}
