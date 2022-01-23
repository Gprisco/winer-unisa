import { useState } from "react";
import SignInForm from "../../Components/Auth/SignInForm";
import { useAuth } from "../../Hooks/Auth/useAuth";

const SignIn = ({ onAuth }) => {
  const [apiCalling, setApiCalling] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (errorResponse) => {
    console.error(errorResponse);
    setLoginData({ username: "", password: "", submit: false });

    if (errorResponse.status === 401) setError("Email o Password errati");
  };

  const [loginData, setLoginData] = useAuth((token) => {
    setApiCalling(false);
    onAuth(token);
  }, handleError);

  const handleSubmit = (event) => {
    event.preventDefault();
    setApiCalling(true);
    setLoginData({ ...loginData, submit: true });
  };

  return (
    <SignInForm
      error={error}
      onSubmit={handleSubmit}
      apiCalling={apiCalling}
      loginData={loginData}
      setLoginData={setLoginData}
      onCloseError={() => setError(null)}
    />
  );
};

export default SignIn;
