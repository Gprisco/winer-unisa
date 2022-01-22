import { useState } from "react";
import SignInForm from "../../Components/Auth/SignInForm";
import { useAuth } from "../../Hooks/Auth/useAuth";

const SignIn = ({ onAuth }) => {
  const [error, setError] = useState(null);

  const handleError = (errorResponse) => {
    console.error(errorResponse);
    setLoginData({ username: "", password: "", submit: false });

    if (errorResponse.status === 401) setError("Email o Password errati");
  };

  const [loginData, setLoginData, apiCalling] = useAuth(onAuth, handleError);

  const handleSubmit = (event) => {
    event.preventDefault();

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
