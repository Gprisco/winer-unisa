import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AuthProvider from "./Providers/AuthProvider";

import Main from "./Pages/Main";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#7C3C49",
      main: "#602E37",
      dark: "#452128"
    },
    secondary: {
      light: "#F9F5C8",
      main: "#F5EE9E",
      dark: "#F1E87E"
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <ToastContainer />
        <Main />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
