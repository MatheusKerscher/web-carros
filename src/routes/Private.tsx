import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

type PrivateProps = {
  children: ReactNode;
};

const Private = ({ children }: PrivateProps) => {
  const { signed } = useContext(AuthContext);

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Private;
