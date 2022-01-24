import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

import AddToCart from "./AddToCart";

import { capitalize } from "../../Helpers/string";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function WineListItem({ wine }) {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 500,
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="Bottle" src="https://wineboard.io/api/wine/image/10633" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={5}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {capitalize(wine.wine)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {wine.winery.winery}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Disponibili: {wine.availability}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                Dettagli
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs
            container
            direction="column"
            alignItems="flex-end"
            justifyContent="center"
            spacing={5}
          >
            <Grid item textAlign="center">
              <Typography variant="subtitle1" component="div">
                € {wine.price}
              </Typography>
            </Grid>
            <Grid item>{wine.availability > 0 && <AddToCart />}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
