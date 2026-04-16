import React from 'react';

type CheckboxProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    name?: string;
    children?: React.ReactNode;
    label?: string;
};

export default function Checkbox({
    checked,
    onChange,
    name,
    children,
    label,
}: CheckboxProps) {
    return (
        <label className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="sr-only peer"
            />

            <span
                className="
          flex h-6 w-6 items-center justify-center
          rounded-lg border border-gray-300 bg-white
          transition-all duration-200
          peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white
          peer-focus:ring-2 peer-focus:ring-primary
        "
            >
                <span
                    className={`
            transition-all duration-200
            ${checked ? "scale-100 opacity-100" : "scale-75 opacity-0"}
          `}
                >
                    {children}
                </span>
            </span>

            {label && <span className="text-sm font-medium">{label}</span>}
        </label>
    );
}