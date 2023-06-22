import { FC, ReactNode, useContext, useEffect, useState } from "react";

import { Context } from "./AuthContext";
import { getTokens } from "api/auth";
import { useUserInfo } from "api/user";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState("");
  const { accessToken } = getTokens();

  const { user } = useUserInfo(accessToken!);

  useEffect(() => {
    setToken(accessToken!);
  }, [accessToken]);

  const ctx = {
    accessToken: token,
    user: {
      email: user?.email,
      firstName: user?.fname,
      lastName: user?.lname,
    },
  };

  // Provide the authentication context to the children components
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

export const useAuth = () => useContext(Context);
