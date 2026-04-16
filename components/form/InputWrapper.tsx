type InputWrapperProps = {
    labelName?: string;
    error?: string;
    children?: any;
    customClass?: string;
};

export default function InputWrapper({
    labelName = "",
    error,
    children,
    customClass = "",
}: InputWrapperProps) {
    return (
        <div className={customClass}>
            <label className="text-text">
                {labelName &&
                    <p className="mb-1 text-sm text-text-light">{labelName}</p>
                }
                {children}
            </label>
            {error && <p className="text-red-800 text-sm mt-1">{error}</p>}
        </div>
    );
}
