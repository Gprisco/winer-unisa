import { Routes, Route, Navigate } from "react-router-dom";
import SignIn, { signInRoute } from "./Auth/SignIn";
import SignUp, { signUpRoute } from "./Auth/SignUp";
import Catalog, { catalogRoute } from "./Catalog/Catalog";

const Main = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={catalogRoute} />} />

      <Route path={signInRoute} element={<SignIn />} />
      <Route path={signUpRoute} element={<SignUp />} />

      <Route path={catalogRoute} element={<Catalog />} />
    </Routes>
  );
};

export default Main;
