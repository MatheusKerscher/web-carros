import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../common/config/firebase";

type AuthContextProps = {
  signed: boolean;
  user: UserProps | null;
  handleInfoUser: ({ uuid, name, email }: UserProps) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

type UserProps = {
  uuid: string;
  name: string | null;
  email: string | null;
};

export const AuthContext = createContext({} as AuthContextProps);
AuthContext.displayName = "AuthContext";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uuid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });

    return unsub();
  }, []);

  const handleInfoUser = ({ uuid, name, email }: UserProps) => {
    setUser({
      uuid,
      name,
      email,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        handleInfoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
