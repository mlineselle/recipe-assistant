import { createContext, useContext } from "react";
import { type AuthContextType } from "../AuthProvider";

export const useAuth = (): AuthContextType => useContext(AuthContext);

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});
