import InputWrapper from './InputWrapper';

type InputFieldTextProps<TDraft, K extends keyof TDraft> = {
    field: K;
    name?: string;
    labelName: string;
    placeholder?: string;
    draftValue: TDraft[K];
    updateDraftValue: (field: K, value: string) => void;
    error?: string;
    customClass?: string;
};

export default function InputFieldText<
    TDraft,
    K extends keyof TDraft
>({
    name,
    field,
    labelName,
    placeholder,
    draftValue,
    updateDraftValue,
    error,
    customClass
}: InputFieldTextProps<TDraft, K>) {
    return (
        <InputWrapper
            labelName={labelName}
            error={error}
            customClass={customClass}
        >
            <textarea
                className="block w-full h-25 p-2 bg-white text-text rounded-lg border border-gray-500 resize-none overflow-hidden"
                name={String(name ?? field)}
                value={typeof draftValue === "string" ? draftValue : ""}
                placeholder={placeholder}
                onChange={(e) => {
                    updateDraftValue(field, e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.max(e.target.scrollHeight, 100) + "px";
                }}
            />
        </InputWrapper>
    );
}
