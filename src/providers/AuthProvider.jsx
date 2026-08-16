import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ loading: false, error: null });
  const [user, setUser] = useState({
    firstName: null,
    secondName: null,
    password: null,
    username: null,
    admin: false,
  });
  function login(userInfo) {
    setAuthState({ loading: true, error: null });
    fetch("http://localhost:3001/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to login user: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const usr = data.find(
          (user) =>
            user.username === userInfo.username &&
            user.password === userInfo.password,
        );
        if (!usr) {
          throw new Error("No user with those credetials");
        }
        setUser(user);
        setAuthState({ loading: false, error: null });
      })
      .catch((e) => setAuthState({ loading: false, error: e.message }));
  }
  const value = { user, authState, login };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === null || context === undefined) {
    throw new Error("Auth context can not be accessed outside auth provider");
  }
  return context;
}

export { AuthProvider, useAuth };
