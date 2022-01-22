import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../Services/routes";

export const useAuth = (setTokenCallback, errorCallback) => {
  const [signInData, doSignIn] = useState({
    email: "",
    paassword: "",
    submit: false,
  });

  const [apiCalling, setApiCalling] = useState(false);

  useEffect(() => {
    const { email, password, submit } = signInData;

    async function signIn() {
      console.log("calling signIn...");
      setApiCalling(true);

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
      } catch (error) {
        errorCallback(error.response);
      }

      setApiCalling(false);
    }

    console.log(email, password);
    if (submit && !apiCalling) signIn();
  }, [signInData, setTokenCallback, errorCallback, apiCalling]);

  return [signInData, doSignIn, apiCalling];
};
