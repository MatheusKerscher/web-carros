import type { ReactNode } from "react";

type ButtonProps = {
  type: "button" | "submit",
  classStyle: string,
  children: ReactNode,
  disabled: boolean
}

const Button = ({children, type, classStyle = "bg-black", disabled}: ButtonProps) => {
  return( <button
    type={type}
    className={`text-white rounded-lg text-center font-bold md:text-lg py-2 transition-all ${classStyle}`}
    disabled={disabled}
  >
    {children}
  </button>);
};

export default Button;
