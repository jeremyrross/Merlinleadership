import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-[13px] gap-1.5 rounded-sm",
  md: "px-[18px] py-[9px] text-sm gap-2 rounded-md",
  lg: "px-6 py-3 text-base gap-2 rounded-md",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-teal-500 text-white border border-transparent hover:bg-teal-600 active:bg-teal-700",
  accent: "bg-orange-500 text-white border border-transparent hover:bg-orange-600 active:bg-orange-700",
  secondary:
    "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100",
  ghost: "bg-transparent text-teal-500 border border-transparent hover:bg-teal-50 active:bg-teal-100",
  danger: "bg-[#d64545] text-white border border-transparent hover:bg-[#b83636] active:bg-[#a32d2d]",
};

const base =
  "inline-flex items-center justify-center font-semibold font-sans whitespace-nowrap transition-[background-color,transform] duration-fast ease-[cubic-bezier(.4,0,.2,1)] active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonAsLink = CommonProps & {
  href: string;
  disabled?: undefined;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", size = "md", icon, fullWidth, className = "" } = props;
  const classes = `${base} ${sizeClasses[size]} ${variantClasses[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props as ButtonAsButton;
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {icon}
      {children}
    </button>
  );
}
