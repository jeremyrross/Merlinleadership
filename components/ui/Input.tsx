import type { ChangeEventHandler } from "react";

export type InputProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "email" | "password" | "number";
  error?: string;
  disabled?: boolean;
  helpText?: string;
  required?: boolean;
  className?: string;
};

export function Input({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
  disabled = false,
  helpText,
  required,
  className = "",
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1.5 font-sans w-full ${className}`}>
      {label && (
        <label className="text-[13px] font-semibold text-neutral-900">{label}</label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        onChange={onChange}
        className={`w-full px-3.5 py-2.5 text-[15px] rounded-md bg-white text-neutral-900 outline-none border transition-[border-color,box-shadow] duration-fast disabled:bg-neutral-100 ${
          error
            ? "border-[#d64545]"
            : "border-neutral-300 focus:border-teal-500 focus:shadow-focus"
        }`}
      />
      {(error || helpText) && (
        <span className={`text-xs ${error ? "text-[#d64545]" : "text-neutral-400"}`}>
          {error || helpText}
        </span>
      )}
    </div>
  );
}
