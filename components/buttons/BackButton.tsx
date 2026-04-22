"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import IconBack from "../icons/IconBack";

export default function BackButton({ href }: { href?: string | null }) {
    const router = useRouter();

    function handleBack() {
        console.log(href);

        if (href) {
            console.log(href);
            router.push(href);
        } else if (window.history.length > 1) {
            console.log("back");
            router.back();
        } else {
            console.log("root");

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