import AddWineForm from "../../../Components/Admin/Wines/AddWineForm";
import PageTitle from "../../../Components/Common/PageTitle";
import AdminPage from "../Common/AdminPage";

export const addWineRoute = "add-wine";

const AddWine = () => {
  return (
    <AdminPage>
      <PageTitle title="Aggiungi un Vino" />
      <AddWineForm />
    </AdminPage>
  );
};

export default AddWine;
