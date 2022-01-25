import PageTitle from "../../Components/Common/PageTitle";
import WineList from "../../Components/Catalog/WineList";

export const catalogRoute = "catalog";

const Catalog = () => {
  return (
    <>
      <PageTitle title="Catalogo" />
      <WineList />
    </>
  );
};

export default Catalog;
