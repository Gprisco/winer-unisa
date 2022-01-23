import AuthProvider from "./Providers/AuthProvider";

import Main from "./Pages/Main";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
