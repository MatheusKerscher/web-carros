import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../common/config/firebase";
import type { UserProps } from "../types/user";

type AuthContextProps = {
  signed: boolean;
  user: UserProps | null;
  handleInfoUser: ({ uid, name, email }: UserProps) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);
AuthContext.displayName = "AuthContext";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const handleInfoUser = ({ uid: uuid, name, email }: UserProps) => {
    setUser({
      uid: uuid,
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
