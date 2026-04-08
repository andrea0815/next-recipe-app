"use client";

import { useActionState, useState } from "react";
import { editUnit, createUnit } from "@/actions/units";
import { ActionResult } from "@/types/actions";

import type { UnitDraft, UnitFieldErrors } from "@/types/unit";
import { FormMode, SubmitButtonText } from "@/types/general";
import SectionWrapper from "../containers/SectionWrapper";
import Button from "../buttons/Button";


export default function FormSection({
    formAction,
    children,
    isPending,
    submitButtonText,
}: {
    formAction: any;
    children: any;
    isPending: boolean;
    submitButtonText: SubmitButtonText;
}) {

    return (
        <SectionWrapper customClass="w-full max-w-100">
            <form action={formAction} className=" flex flex-col gap-2">

                {children}

                <Button
                    type="submit"
                    disabled={isPending}
                    customClass="mt-6"
                >
                    {isPending ? submitButtonText.pending : submitButtonText.default}
                </Button>
            </form>
        </SectionWrapper>
    );
}
