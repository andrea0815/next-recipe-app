"use client"

import Button from '@/components/buttons/Button';
import SectionWrapper from '@/components/containers/SectionWrapper';
import { useRouter } from "next/navigation";
import GeneralSection from '../containers/GeneralSection';

export default function NoPermissionClient() {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/");
        }
    };

    return (
        <GeneralSection>
            <div className='flex-1 w-full flex flex-col gap-10 justify-center items-center text-center'>
                <SectionWrapper>
                    <div className='px-20 py-4'>
                        <h1 className='text-8xl font-bold text-primary mb-4'>
                            403
                        </h1>
                        <h2 className='text-2xl font-bold'>
                            No permission :/
                        </h2>
                    </div>
                </SectionWrapper>

                <div className='w-100 max-w-full flex flex-col gap-4'>
                    <Button
                        stretch={true}
                        onClick={handleBack}
                    >
                        Back to previous Page
                    </Button>
                </div>
            </div>
        </GeneralSection>
    );
}
