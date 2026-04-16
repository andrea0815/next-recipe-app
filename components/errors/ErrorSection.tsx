'use client';

import Button from "@/components/buttons/Button";
import SectionWrapper from "@/components/containers/SectionWrapper";
import IconAlertTriangle from "../icons/IconAlertTriangle";

export default function ErrorSection({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="w-full flex-1 p-10 flex flex-col gap-6 justify-center items-center  text-center ">
            <h2 className="text-2xl font-bold text-red flex gap-2 mb-4"> <IconAlertTriangle size={30} /> Something went wrong</h2>
            <SectionWrapper customClass="w-full min-h-30 max-w-150 flex  gap-4 items-center justify-center text-red">
                <div className="w-full h-full overflow-scroll">
                    <p className=" text-red-800">{error.message}</p>
                </div>
            </SectionWrapper>
            <Button
                onClick={() => reset()}
                customClass="w-50"
            >
                Try again
            </Button>
        </div>
    );
}