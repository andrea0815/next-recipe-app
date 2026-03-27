import { FormMode } from '@/types/general';
import { UnitDraft } from "@/types/unit";

import UnitForm from '@/components/unit/UnitForm';

export default function AddUnitPage() {

  const emptyDraft: UnitDraft = {
    id: "",
    name: "",
    abbreviation: "",
    plural: "",
  };

  return (
    <>
      <UnitForm
        initialDraft={emptyDraft}
        mode={FormMode.CREATE}
        submitButtonText={{ default: "Add Unit", pending: "Creating Unit …" }} />
    </>
  );
}
