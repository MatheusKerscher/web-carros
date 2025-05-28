/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

type InputFieldProps = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: "number" | "text" | "email" | "password" | "tell";
  containerClassStyle?: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
};

const InputField = ({
  label,
  placeholder,
  type = "text",
  containerClassStyle,
  name,
  register,
  rules,
  error,
}: InputFieldProps) => {
  return (
    <div className={containerClassStyle}>
      {label && <label className="font-bold block mb-1" htmlFor={name}>{label}</label>}

      <input
        className="py-2 px-3 placeholder:text-input-border outline-none w-full border-1 border-input-border rounded-lg"
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
      />

      {error && <span className="text-xs text-danger font-medium">{error}</span>}
    </div>
  );
};

export default InputField;
