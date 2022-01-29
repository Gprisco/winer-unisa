import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import PageTitle from "../../../Components/Common/PageTitle";
import WineList from "../../../Components/Catalog/WineList";
import { addWineRoute } from "./AddWine";
import AdminPage, { adminBaseRoute } from "../Common/AdminPage";

export const adminWineList = "wines";

const AdminWineList = () => {
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
      <WineList admin={true} />
    </AdminPage>
  );
};

export default AdminWineList;
