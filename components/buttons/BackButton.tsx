"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import IconBack from "../icons/IconBack";

export default function BackButton({ href }: { href?: string | null }) {
    const router = useRouter();

    function handleBack() {

        if (href) {
            router.push(href);
        } else if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    }

    return (

        <Button
            onClick={handleBack}
            priority="tertiary"
            customClass="px-0"
            xPadding={false}
        >
            <IconBack /> back
        </Button>
    );
}