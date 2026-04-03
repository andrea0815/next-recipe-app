import React from 'react';
import IngredientForm from '@/components/ingredient/IngredientForm';
import { FormMode } from "@/types/general";

import type { IngredientDraft } from '@/types/ingredient';

export default function AddIngredientPanel() {

    const emptyDraft: IngredientDraft = {
        id: "",
        name: "",
        plural: "",
    };

    return (<>
        <div>
            <IngredientForm
                initialDraft={emptyDraft}
                mode={FormMode.CREATE}
                submitButtonText={{ default: "Save Changes", pending: "Saving Changes …" }} />
        </div>
    </>
    );
}
