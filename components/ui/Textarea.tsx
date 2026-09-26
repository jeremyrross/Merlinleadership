import type { ChangeEventHandler } from "react";

export type TextareaProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
  required?: boolean;
  helpText?: string;
  className?: string;
};

export function Textarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
  required,
  helpText,
  className = "",
}: TextareaProps) {
  return (
    <div className={`flex flex-col gap-1.5 font-sans w-full ${className}`}>
      {label && (
        <label className="text-[13px] font-semibold text-neutral-900">{label}</label>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        rows={rows}
        required={required}
        onChange={onChange}
        className="w-full px-3.5 py-2.5 text-[15px] leading-relaxed rounded-md bg-white text-neutral-900 outline-none border border-neutral-300 resize-none transition-[border-color,box-shadow] duration-fast focus:border-teal-500 focus:shadow-focus"
      />
      {helpText && <span className="text-xs text-neutral-400">{helpText}</span>}
    </div>
  );
}
