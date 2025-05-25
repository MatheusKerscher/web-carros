import { type ReactNode } from "react";

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

type ButtonProps = {
  type: "button" | "submit";
  classStyle: string;
  children: ReactNode;
  disabled: boolean;
  loading?: boolean;
};

const Button = ({
  children,
  type,
  classStyle = "bg-black",
  disabled,
  loading = false
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`text-white rounded-lg text-center font-bold md:text-lg py-2 transition-all ${classStyle}`}
      disabled={disabled}
    >
      {
        loading 
          ? <Spin indicator={<LoadingOutlined spin  style={{color: "#ffffff"}}/>} />
          : children
      }
    </button>
  );
};

export default Button;
