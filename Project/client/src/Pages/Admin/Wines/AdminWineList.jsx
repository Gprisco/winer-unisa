import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import PageTitle from "../../../Components/Common/PageTitle";
import WineList from "../../../Components/Catalog/WineList";
import { addWineRoute } from "./AddWine";
import AdminPage, { adminBaseRoute } from "../Common/AdminPage";
import { deleteWine } from "../../../Components/Admin/Wines/services/deleteWine";

export const adminWineList = "wines";

const AdminWineList = () => {
  const onDelete = (wine, vintage, cb) => {
    deleteWine(wine, vintage, (err, res) => {
      if (err) {
        toast("Errore nell'eliminazione del vino", {
          type: toast.TYPE.ERROR,
        });
        return cb(false);
      }

      cb(true);
    });
  };

  return (
    <AdminPage>
      <Grid container justifyContent="center" alignItems="center" mt="10px">
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          alignItems="center"
        >
          <Button>
            <Link to={adminBaseRoute + "/" + addWineRoute}>Aggiungi Vino</Link>
          </Button>
        </Grid>
      </Grid>

      <PageTitle title="Catalogo Admin" />
      <WineList admin={true} onDelete={onDelete} />
    </AdminPage>
  );
};

export default AdminWineList;
