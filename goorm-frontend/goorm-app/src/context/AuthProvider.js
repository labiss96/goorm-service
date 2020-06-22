import React, { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const onLogin = () => {
    setLogged(true);
    console.log("run login in context");
  };

  const onLogout = () => {
    setLogged(false);
    console.log("run logout in context");
  };

  //state초기화 객체.
  const initialState = {
    logged: false,
    onLogin,
    onLogout,
  };
  const [logged, setLogged] = useState(initialState);

  return <AuthContext.Provider value={logged}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
