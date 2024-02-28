"use client";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props<T extends FieldValues> {
  label: string;
  register: UseFormRegister<T>;
  name: keyof T;
  errorMessage?: string;
  isInvalid?: boolean;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

function TextArea<FormSchema extends FieldValues>({
  label,
  name,
  register,
  errorMessage,
  isInvalid,
  required,
  placeholder,
  disabled,
}: Props<FormSchema>) {
  return (
    <div>
      <label className="form-control w-full">
        <div className="label">
          <span className={twMerge("label-text", isInvalid && "text-error")}>
            {isInvalid ? errorMessage : label}
          </span>
        </div>
        <textarea
          {...register(name as Path<FormSchema>, { required })}
          placeholder={placeholder}
          className={twMerge(
            "textarea textarea-bordered h-24",
            isInvalid && "textarea-error"
          )}
          autoComplete="off"
          disabled={disabled}
        />
      </label>
    </div>
  );
}

export default TextArea;
