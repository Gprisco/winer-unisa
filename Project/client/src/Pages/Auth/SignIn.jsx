import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignInForm from "../../Components/Auth/SignInForm";
import useAuth from "../../Hooks/Auth/useAuth";

export const signInRoute = "signin";

const SignIn = () => {
  const auth = useAuth();

  const navigate = useNavigate("/");
  const location = useLocation();

  const [apiCalling, setApiCalling] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleError = (errorResponse) => {
    console.error(errorResponse);

    setApiCalling(false);
    setEmail("");
    setPassword("");

    if (errorResponse.status === 401) setError("Email o Password errati");
    else
      setError(
        "Internal Server Error, se l'errore persiste contattare l'amministratore."
      );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setApiCalling(true);
    auth.signIn(email, password, (err) => {
      if (err) handleError(err);
      else {
        const referrer = location.state?.from?.pathname || "/";
        navigate(referrer);
      }
    });
  };

  return (
    <SignInForm
      error={error}
      onSubmit={handleSubmit}
      apiCalling={apiCalling}
      email={email}
      onEmail={setEmail}
      password={password}
      onPassword={setPassword}
      onCloseError={() => setError(null)}
    />
  );
};

export default SignIn;
