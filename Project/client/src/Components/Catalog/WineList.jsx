import { useState } from "react";

import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

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

  const [wines, page, setPage, apiCalling] = useWines(onError);

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
        </Grid>
      )}
    </>
  );
};

export default WineList;
