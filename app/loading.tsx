import Logo from "@/components/general/Logo";
import IconSpinner from "@/components/icons/IconSpinner";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-400">
            <div className="flex flex-col items-center gap-4">

                <div className="text-white">
                    <Logo />
                </div>

                <p className="text-sm font-medium flex gap-3">
                    <IconSpinner /> Loading
                </p>
            </div>
        </div>
    );
}
