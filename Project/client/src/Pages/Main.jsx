import { Routes, Route, Navigate } from "react-router-dom";
import CartProvider from "../Providers/CartProvider";

import Catalog, { catalogRoute } from "./Catalog/Catalog";
import RequireAuth from "../Components/Auth/RequireAuth";
import SignIn, { signInRoute } from "./Auth/SignIn";
import SignUp, { signUpRoute } from "./Auth/SignUp";
import Cart, { cartRoute } from "./Cart/Cart";
import WineDetailsPage, { wineDetailsRoute } from "./Catalog/WineDetailsPage";

import ResponsiveAppBar from "./ResponsiveAppBar";
import useAuth from "../Hooks/Auth/useAuth";
import AddWine, { addWineRoute } from "./Admin/Wines/AddWine";
import AdminWineList, { adminWineList } from "./Admin/Wines/AdminWineList";
import { adminBaseRoute } from "./Admin/Common/AdminPage";
import UpdateWine, { updateWineRoute } from "./Admin/Wines/UpdateWine";

const Main = () => {
  const auth = useAuth();

  return (
    <CartProvider>
      <ResponsiveAppBar />

      <Routes>
        <Route index element={<Navigate to={catalogRoute} />} />

        {!auth.user && (
          <>
            <Route path={signInRoute} element={<SignIn />} />
            <Route path={signUpRoute} element={<SignUp />} />
          </>
        )}

        <Route path={catalogRoute} element={<Catalog />} />
        <Route
          path={`${catalogRoute}/${wineDetailsRoute(":wine", ":vintage")}`}
          element={<WineDetailsPage />}
        />
        <Route
          path={cartRoute}
          element={
            <RequireAuth>
              <Cart />
            </RequireAuth>
          }
        />

        <Route path={adminBaseRoute}>
          <Route index element={<Navigate to={adminWineList} />} />

          <Route path={adminWineList} element={<AdminWineList />} />
          <Route path={addWineRoute} element={<AddWine />} />
          <Route
            path={updateWineRoute(":wine", ":vintage")}
            element={<UpdateWine />}
          />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default Main;
