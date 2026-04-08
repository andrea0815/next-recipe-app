"use client"
import { useRouter } from "next/navigation";

import React from 'react';
import Button from './Button';
import IconBack from "../icons/IconBack";

export default function BackButton() {

    const router = useRouter();

    return (
        <Button
            onClick={() => router.back()}
            priority="tertiary">
            <IconBack /> back
        </Button>
    );
}
