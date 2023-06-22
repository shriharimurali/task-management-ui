import { InputHTMLAttributes, forwardRef } from "react";
import { FormState } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: string;
  rightIcon?: string;
  placeHolder?: string;
  className?: string;
  inputClassName?: string;
  inputLabelClass?: string;
  containerClassName?: string;
  label?: string;
  error?: string;
  formState?: FormState<any>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    leftIcon,
    formState,
    placeHolder,
    label,
    error,
    inputClassName = "",
    className = "",
    containerClassName = "",
    ...inputProps
  } = props;

  const inputError =
    formState?.errors?.[inputProps.name || ""]?.message || (error as any);
  const outline = inputError
    ? "focus:outline-red-500 border-red-500 border-2"
    : "";

  return (
    <label className={`space-y-2 ${containerClassName}`}>
      {label && <p>{label}</p>}
      <div
        className={`flex p-4 border border-indigo-300 rounded-xl bg-indigo-100 ${outline} ${className}`}
      >
        {leftIcon && (
          <img
            src={leftIcon}
            alt="email-icon"
            className="w-6 h-6 text-slate-100 mr-4"
          />
        )}

        <input
          className={`${inputClassName} bg-transparent w-full outline-none text-slate-500`}
          placeholder={placeHolder}
          ref={ref}
          {...inputProps}
        />
      </div>

      {inputError && (
        <p className="text-red-500 !first-letter:capitalize">{inputError}</p>
      )}
    </label>
  );
});
