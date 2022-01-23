import { useState } from "react";
import axios from "axios";
import { authService } from "../Services/routes";
import AuthContext from "../Contexts/AuthContext";
import jwtDecode from "jwt-decode";
import {
  setBearerToken,
  getBearerToken,
  deleteBearerToken,
} from "../Helpers/bearerToken";

const authProvider = {
  isAuthenticated: !!getBearerToken(),
  async signIn(email, password, callback) {
    const options = {
      method: "POST",
      url: authService.login,
      data: {
        email,
        password,
      },
    };

    try {
      const { data } = await axios(options);

      setBearerToken(data.access_token);
      callback(null, jwtDecode(data.access_token));
    } catch (error) {
      callback(error.response, null);
    }
  },
  async signUp(email, password, callback) {
    const options = {
      method: "POST",
      url: authService.register,
      data: {
        email,
        password,
      },
    };

    try {
      const { data } = await axios(options);

      callback(null, data);
    } catch (error) {
      callback(error.response, null);
    }
  },
  signOut(callback) {
    deleteBearerToken();
    callback();
  },
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    authProvider.isAuthenticated && !!getBearerToken()
      ? jwtDecode(getBearerToken())
      : null
  );

  function signIn(email, password, callback) {
    return authProvider.signIn(email, password, (err, user) => {
      if (err) return callback(err);

      setUser(user);
      callback(null);
    });
  }

  function signUp(email, password, callback) {
    return authProvider.signUp(email, password, (err) => {
      console.error(err);

      return authProvider.signIn(email, password, (err, user) => {
        if (err) return callback(err);

        setUser(user);
        callback(null);
      });
    });
  }

  let signOut = (callback) => {
    return authProvider.signOut(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signIn, signUp, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
