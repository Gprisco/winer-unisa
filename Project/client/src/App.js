import Main from "./Pages/Main";
import AuthProvider from "./Providers/AuthProvider";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
