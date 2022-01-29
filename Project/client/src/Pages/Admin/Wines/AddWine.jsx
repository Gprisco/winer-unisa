import WineForm from "../../../Components/Admin/Wines/WineForm";
import PageTitle from "../../../Components/Common/PageTitle";
import AdminPage from "../Common/AdminPage";

export const addWineRoute = "add-wine";

const AddWine = () => {
  return (
    <AdminPage>
      <PageTitle title="Aggiungi un Vino" />
      <WineForm />
    </AdminPage>
  );
};

export default AddWine;
