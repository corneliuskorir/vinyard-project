import { createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null || context === undefined) {
    throw new Error("Auth context can not be accessed outside auth provider");
  }
  return context;
}
