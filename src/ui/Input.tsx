import clsx from "clsx";
import { forwardRef, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "number";
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder = "Enter here...",
      type = "text",
      errorMessage,
      ...rest
    }: InputProps,
    ref,
  ) => {
    const id = useId();
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label className="text-sm font-semibold" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className={clsx([
            "bg-(--card-bg) h-10 w-full px-2 outline-none border border-(--white) rounded-[8px] focus-visible:border-(--goala-blue) transition-colors",
            errorMessage && "!border-(--goala-red)",
          ])}
          ref={ref}
          id={id}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
        {errorMessage && (
          <p className="text-xs text-(--goala-red)">*{errorMessage}</p>
        )}
      </div>
    );
  },
);
export default Input;
