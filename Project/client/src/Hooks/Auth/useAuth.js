import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../Services/routes";

export const useAuth = (setTokenCallback, errorCallback) => {
  const [signInData, doSignIn] = useState({
    email: "",
    password: "",
    submit: false,
  });

  useEffect(() => {
    const { email, password, submit } = signInData;

    async function signIn() {
      console.log("calling signIn...");

      const options = {
        method: "POST",
        url: auth.login,
        data: {
          email,
          password,
        },
      };

      try {
        const { data } = await axios(options);

        setTokenCallback(data.access_token);
        return () => {};
      } catch (error) {
        errorCallback(error.response);
        return () => {};
      }
    }

    console.log(email, password);
    if (submit) signIn();
  }, [signInData, setTokenCallback, errorCallback]);

  return [signInData, doSignIn];
};
