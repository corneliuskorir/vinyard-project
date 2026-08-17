import { createContext, useContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_BASE_API_URL;

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ loading: true, error: null });
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState({
    firstName: null,
    email: null,
    secondName: null,
    password: null,
    userName: null,
    admin: false,
  });
  useEffect(() => {
    setAuthState({ loading: true, error: null });
    const usr = localStorage.getItem("user");

    if (usr) {
      const storedUser = JSON.parse(usr);
      console.log("Stored User", storedUser);

      setUser(storedUser);
    }
    setAuthState({ loading: false, error: null });
  }, [allUsers]);

  function login(userInfo) {
    setAuthState({ loading: true, error: null });
    fetch(`${API_URL}/users`)
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
    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...userInfo, admin: true }),
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

  function logOut() {
    setUser({
      firstName: null,
      email: null,
      secondName: null,
      password: null,
      userName: null,
      admin: false,
    });
    localStorage.clear();
  }

  function getAllUsers() {
    fetch(`${API_URL}/users`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to get users: ${res.status}`);
        }
        return res.json();
      })
      .then(setAllUsers)
      .catch(console.error);
  }

  function makeAdmin(user) {
    const isAdmin = !user.admin;
    fetch(`${API_URL}/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...user, admin: isAdmin }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to update user: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const newUsrs = allUsers.map((usr) =>
          usr.id === user.id ? data : usr,
        );
        setAllUsers(newUsrs);
      })
      .catch(console.log);
  }

  const value = {
    user,
    authState,
    login,
    signUp,
    getAllUsers,
    allUsers,
    makeAdmin,
    logOut,
  };
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
