import { getCurrentDbUser } from "@/lib/auth/getCurrentDbUser";
import { getUnit } from "@/lib/db/units";
import { notFound } from "next/navigation";

import { UnitDraft } from "@/types/unit";
import Navbar from '@/components/header/Navbar';
import UnitForm from "@/components/unit/UnitForm";
import { FormMode } from "@/types/general";

export default async function EditUnitPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const user = await getCurrentDbUser();

  if (!user) {
    notFound();
  }
  const unit: UnitDraft | null = await getUnit(id)

  if (!unit) {
    notFound();
  }

  return (
    <>
      <UnitForm
        initialDraft={unit}
        mode={FormMode.EDIT}
        submitButtonText={{ default: "Save Changes", pending: "Saving Changes …" }} />
    </>
  );
}
