import { useState } from "react";

import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import useCart from "../../Hooks/Cart/useCart";
import useWines from "../../Hooks/Wines/useWines";
import WineListItem from "./WineListItem";
import ErrorAlert from "../Common/ErrorAlert";
import Loader from "../Common/Loader";

const WineList = () => {
  const cart = useCart();

  const [error, setError] = useState(null);

  const onError = (err) => {
    setError(JSON.stringify(err));
  };

  let searchWinesTimeout = null;
  const onWineSearchChange = (value) => {
    if (searchWinesTimeout) window.clearTimeout(searchWinesTimeout);

    searchWinesTimeout = setTimeout(() => setSearch(value), 800);
  };

  const [wines, page, setPage, apiCalling, setSearch] = useWines(onError);

  const WinePages = () => (
    <Pagination
      count={wines.pages || 1}
      page={page}
      showFirstButton
      onChange={(event, value) => setPage(value)}
      sx={{ marginX: "auto" }}
    />
  );

  return (
    <>
      <ErrorAlert error={error} />

      <Loader open={apiCalling} />

      <Grid container spacing={2} justifyContent="center" mb="20px">
        <Grid item container spacing={2} justifyContent="center" xs={6}>
          <TextField
            width="50%"
            margin="normal"
            required
            fullWidth
            id="wine"
            label="Cerca un vino"
            name="wine"
            autoComplete="wine"
            autoFocus
            onChange={(props) => onWineSearchChange(props.target.value)}
          />
        </Grid>
      </Grid>

      {wines.data && (
        <Grid container spacing={2}>
          <Grid container justifyContent={"center"} spacing={5}>
            <Grid item>
              <WinePages />
            </Grid>
          </Grid>

          {wines.data.map((item) => (
            <Grid key={item.wine + item.vintage} item xs={12}>
              <WineListItem wine={item} cart={cart} />
            </Grid>
          ))}

          {wines.data.length === 0 && (
            <Grid item xs={12}>
              Nessun vino trovato
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default WineList;
