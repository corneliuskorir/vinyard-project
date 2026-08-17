import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ loading: false, error: null });
  const [user, setUser] = useState({
    firstName: null,
    email: null,
    secondName: null,
    password: null,
    userName: null,
    admin: false,
  });
  useEffect(() => {
    const usr = localStorage.getItem("user");

    if (usr) {
      const storedUser = JSON.parse(usr);
      setUser(storedUser);
    }
  }, []);

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
        console.log(usr);
        if (!usr) {
          throw new Error("No user with those credetials");
        }
        setUser(usr);
        localStorage.setItem("user", JSON.stringify(usr));
        setAuthState({ loading: false, error: null });
      })
      .catch((e) => setAuthState({ loading: false, error: e.message }));
  }
  function signUp(userInfo) {
    setAuthState({ loading: true, error: null });
    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: { "Content-Type": "application/text" },
      body: JSON.stringify({ ...userInfo, admin: false }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to sign up user: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setAuthState({ loading: false, error: null });
      })
      .catch((e) => setAuthState({ loading: false, error: e.message }));
  }
  const value = { user, authState, login, signUp };
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
