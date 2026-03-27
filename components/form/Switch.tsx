"use client";

type SwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    name?: string;
};

export default function Switch({
    checked,
    name,
    onChange,
    disabled = false,
}: SwitchProps) {
    return (
        <>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-disabled={disabled}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-gray-300"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
                <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${checked ? "translate-x-7" : "translate-x-1"
                        }`}
                />
            </button>

            <input
                type="checkbox"
                name={name}
                checked={checked}
                readOnly
                className="hidden"
            />
        </>
    );
}