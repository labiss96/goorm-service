import { createContext } from "react";

const AuthContext = createContext({
  logged: false,
  onLogin: () => {},
  onLogout: () => {},
});

export default AuthContext;
