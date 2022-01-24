import { ToastContainer } from "react-toastify";

import AuthProvider from "./Providers/AuthProvider";

import Main from "./Pages/Main";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Main />
    </AuthProvider>
  );
}

export default App;
