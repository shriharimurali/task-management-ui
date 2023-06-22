import { createContext } from "react";

export interface AuthContext {
  accessToken: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const Context = createContext({} as AuthContext);
