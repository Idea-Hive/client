import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
    register: UseFormRegisterReturn;
    type?: string;
    placeholder?: string;
    error?: string;
    label?: string;
    required?: boolean;
}

export default function Input({ register, type = "text", placeholder, error, label, required }: InputProps) {
    return (
        <div>
            {label && (
                <label className="block mb-2 text-base font-medium text-gray-900">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input {...register} type={type} placeholder={placeholder} className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF9050]" />
            {error && <p className="mt-1 text-sm text-red-500 ml-4">{error}</p>}
        </div>
    );
}
