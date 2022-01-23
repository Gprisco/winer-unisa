import { createContext } from "react";

export default createContext({
  user: null,
  signIn: (email, password, callback) => {},
  signUp: (email, password, callback) => {},
  signOut: (callback) => {},
});
