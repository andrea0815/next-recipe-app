import Logo from "@/components/general/Logo";
import IconSpinner from "@/components/icons/IconSpinner";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-400">
            <div className="flex flex-col items-center gap-4">

                <div className="text-white">
                    <Logo />
                </div>

                <div className="text-sm font-medium flex gap-3">
                    <IconSpinner /> <p>Loading</p>
                </div>
            </div>
        </div>
    );
}
