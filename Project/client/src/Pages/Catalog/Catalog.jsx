import Typography from "@mui/material/Typography";

import RequireAuth from "../../Components/Auth/RequireAuth";
import WineList from "../../Components/Catalog/WineList";

export const catalogRoute = "/catalog";

const Catalog = () => {
  return (
    <RequireAuth>
      <Typography variant="h3" sx={{ marginY: "30px", marginX: "50px" }}>
        Catalogo
      </Typography>
      <WineList />
    </RequireAuth>
  );
};

export default Catalog;
