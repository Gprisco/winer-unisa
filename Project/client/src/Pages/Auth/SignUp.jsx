import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignUpForm from "../../Components/Auth/SignUpForm";
import useAuth from "../../Hooks/Auth/useAuth";

export const signUpRoute = "signup";

const SignUp = () => {
  const auth = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [apiCalling, setApiCalling] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);

  const handleError = (errorResponse) => {
    console.error(errorResponse);

    setApiCalling(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword)
      return setError("Le password non corrispondono");

    setApiCalling(true);
    auth.signUp(email, password, (err) => {
      if (err) handleError(err);
      else {
        const referrer = location.state?.from?.pathname || "/";
        navigate(referrer);
      }
    });
  };

  return (
    <SignUpForm
      error={error}
      onSubmit={handleSubmit}
      apiCalling={apiCalling}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      onEmail={setEmail}
      onPassword={setPassword}
      onConfirmPassword={setConfirmPassword}
      onCloseError={() => setError(null)}
    />
  );
};

export default SignUp;
