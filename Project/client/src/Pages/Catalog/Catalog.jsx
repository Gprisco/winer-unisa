import PageTitle from "../../Components/Common/PageTitle";
import RequireAuth from "../../Components/Auth/RequireAuth";
import WineList from "../../Components/Catalog/WineList";

export const catalogRoute = "/catalog";

const Catalog = () => {
  return (
    <RequireAuth>
      <PageTitle title="Catalogo" />
      <WineList />
    </RequireAuth>
  );
};

export default Catalog;
