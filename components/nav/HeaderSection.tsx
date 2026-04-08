"use client";

import { usePathname } from "next/navigation";
import BackButton from "@/components/buttons/BackButton";
import Button from "@/components/buttons/Button";
import HeaderSectionWrapper from "@/components/containers/HeaderSectionWrapper";
import HeaderRecipeDetail from "./HeaderRecipeDetail";
import HeaderBack from "./HeaderBack";

export default function HeaderSection({
    rootUrl,
    tabBarHeader,
}: {
    rootUrl: string;
    tabBarHeader?: React.ReactNode;
}) {

    const pathname = usePathname();


    if (tabBarHeader && pathname === rootUrl) {
        return <>{tabBarHeader}</>;
    }

    if (pathname === `${rootUrl}/create`) {
        return (
            <HeaderBack />
        );
    }

    if (pathname.startsWith(`${rootUrl}/`)) {
        return (
            <HeaderRecipeDetail />
        );
    }

    return null;
}