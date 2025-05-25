import type { ReactNode } from "react";

type ButtonProps = {
  type: "button" | "submit",
  classStyle: string,
  children: ReactNode
}

const Button = ({children, type, classStyle = "bg-black"}: ButtonProps) => {
  return( <button
    type={type}
    className={`text-white rounded-lg text-center font-bold md:text-lg py-2 cursor-pointer ${classStyle}`}
  >
    {children}
  </button>);
};

export default Button;
