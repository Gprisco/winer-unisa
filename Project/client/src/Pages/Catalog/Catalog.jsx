import RequireAuth from "../../Components/Auth/RequireAuth";

export const catalogRoute = "/catalog";

const Catalog = () => {
  return (
    <RequireAuth>
      <h1>Benvenuto nel Catalogo di Winer</h1>
    </RequireAuth>
  );
};

export default Catalog;
