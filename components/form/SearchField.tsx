// import { FormState } from '@/actions/recipes';
// import React from 'react';
// import type { RecipeDraft } from "@/types/recipe"
// import InputWrapper from './InputWrapper';

// type SearchFieldProps = {
//     field: K;
//     name?: string;
//     labelName: string;
//     placeholder?: string;
//     draftValue: TDraft[K];
//     updateDraftValue: (field: K, value: string) => void;
//     error?: string;
//     customClass?: string;
// };

// export default function SearchField({
//     field,
//     labelName,
//     placeholder,
//     draftValue,
//     updateDraftValue,
//     error,
//     customClass
// }: SearchFieldProps) {
//     return (
//         <InputWrapper
//             labelName={labelName}
//             error={error}
//         >
//             <input
//                 type="text"
//                 className={`block h-(--btn-h-sm) w-full p-2 bg-white text-text rounded-lg border border-gray-500 ${customClass ? customClass : ""}`}
//                 name="searchParam"
//                 value={typeof draftValue === "string" ? draftValue : ""}
//                 onChange={(e) => updateDraftValue(field, e.target.value)}
//                 placeholder={placeholder}
//             />
//         </InputWrapper>
//     );
// }
