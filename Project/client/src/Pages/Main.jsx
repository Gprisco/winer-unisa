import { Routes, Route, Navigate } from "react-router-dom";
import CartProvider from "../Providers/CartProvider";

import Catalog, { catalogRoute } from "./Catalog/Catalog";
import SignIn, { signInRoute } from "./Auth/SignIn";
import SignUp, { signUpRoute } from "./Auth/SignUp";

import ResponsiveAppBar from "./ResponsiveAppBar";
import useAuth from "../Hooks/Auth/useAuth";

const Main = () => {
  const auth = useAuth();

  if (!auth.user)
    return (
      <Routes>
        <Route index element={<Navigate to={signInRoute} />} />

        <Route path={signInRoute} element={<SignIn />} />
        <Route path={signUpRoute} element={<SignUp />} />
      </Routes>
    );

  return (
    <CartProvider>
      <ResponsiveAppBar />

      <Routes>
        <Route index element={<Navigate to={catalogRoute} />} />

        <Route path={catalogRoute} element={<Catalog />} />
      </Routes>
    </CartProvider>
  );
};

export default Main;
