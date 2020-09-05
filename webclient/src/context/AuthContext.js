import React, { createContext, useState } from "react";

export const AuthContext = createContext("");

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState("");
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
