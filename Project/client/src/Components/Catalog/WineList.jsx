import { useState } from "react";
import { toast } from "react-toastify";

import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

import useCart from "../../Hooks/Cart/useCart";
import useWines from "../../Hooks/Wines/useWines";
import WineListItem from "./WineListItem";
import Loader from "../Common/Loader";
import { Typography } from "@mui/material";

const WineList = () => {
  const cart = useCart();

  const onError = (err) => {
    toast(JSON.stringify(err), { type: toast.TYPE.ERROR });
  };

  let searchWinesTimeout = null;
  const onWineSearchChange = (value) => {
    if (searchWinesTimeout) window.clearTimeout(searchWinesTimeout);

    searchWinesTimeout = setTimeout(() => setSearch(value), 800);
  };

  const [
    wines,
    page,
    setPage,
    apiCalling,
    setSearch,
    priceRange,
    setPriceRange,
  ] = useWines(onError);

  const [priceRangeState, setPriceRangeState] = useState(null);

  if (!!priceRange && !priceRangeState) setPriceRangeState(priceRange);

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
    <Grid
      container
      spacing={2}
      mb="20px"
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems="flex-start"
    >
      <Loader open={apiCalling} />

      <Grid
        item
        container
        xs={4}
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={10}>
          <TextField
            width="100%"
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

        <Grid item my="20px" xs={10}>
          <Box sx={{ maxWidth: 300, minWidth: 200, marginX: "auto" }}>
            <Typography textAlign="center">Prezzo</Typography>

            <Slider
              getAriaLabel={() => "Intervallo di prezzo"}
              value={priceRange}
              onChange={(event, value) => setPriceRange(value)}
              onChangeCommitted={(event, value) => setPriceRange(value)}
              valueLabelDisplay="auto"
              getAriaValueText={() => `${priceRange[0]}-${priceRange[1]}`}
            />
          </Box>
        </Grid>
      </Grid>

      {wines.data && (
        <Grid
          item
          container
          xs
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            container
            mb="10px"
            xs={12}
            justifyContent="center"
            alignItems="center"
          >
            <WinePages />
          </Grid>

          {wines.data.map((item) => (
            <Grid
              item
              container
              xs={12}
              justifyContent="center"
              alignItems="center"
            >
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
    </Grid>
  );
};

export default WineList;
