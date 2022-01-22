import Main from "./Pages/Main";
import SignIn from "./Pages/Auth/SignIn";
import { useBearerToken } from "./Hooks/Auth/useBearerToken";

import "./App.css";

function App() {
  const [token, setToken] = useBearerToken();

  if (!token) return <SignIn onAuth={setToken} />;

  return <Main />;
}

export default App;
