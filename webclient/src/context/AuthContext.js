import React, { createContext, useState,useEffect } from "react";

export const AuthContext = createContext("");

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState("");
  
  useEffect(() => {
    async function checkUser() {
      const res = await fetch("http://localhost:8383/auth/checkUser", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.user) {
        setLoggedIn(data.user.username);
      }else {
        setLoggedIn("")
      }
    }
    checkUser();
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
