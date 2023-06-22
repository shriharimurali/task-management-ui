import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader } from "./Loader";

interface ActionProps {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  loading?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  (props, ref) => {
    const {
      text,
      disabled,
      loading,
      leftIcon,
      rightIcon,
      className = "",
      ...buttonProps
    } = props;

    const baseClassName =
      "rounded-xl bg-indigo-400 min-h-[50px] text-white font-bold uppercase relative disabled:opacity-50 disabled:pointer-events-none";

    return (
      <button
        disabled={disabled || loading}
        className={`${baseClassName} ${className}`}
        ref={ref}
        {...buttonProps}
      >
        {leftIcon && <img src={leftIcon} alt="left-icon" />}
        {text}
        {rightIcon && <img src={rightIcon} alt="left-icon" />}

        {loading && (
          <Loader
            loaderClassName="w-4 h-4 border-white"
            containerClassName="absolute top-0 bottom-0 right-4"
          />
        )}
      </button>
    );
  }
);
