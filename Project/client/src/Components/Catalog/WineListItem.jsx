import * as React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Fab from "@mui/material/Fab";

import AddToCart from "./AddToCart";
import EditIcon from "@mui/icons-material/Edit";

import { capitalize } from "../../Helpers/string";
import { wineDetailsRoute } from "../../Pages/Catalog/WineDetailsPage";
import { catalogRoute } from "../../Pages/Catalog/Catalog";

export const WineImg = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function WineListItem({ wine, cart, admin }) {
  return (
    <Paper
      sx={{
        p: 2,
        marginX: "auto",
        marginY: "auto",
        maxWidth: 500,
        flexGrow: 1,
      }}
    >
      <Grid item container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <WineImg
              alt="Bottle"
              src={`https://wineboard.io/api/wine/image/${
                wine.winefamily.winecolor.winecolorId === 1
                  ? 2407
                  : wine.winefamily.winecolor.winecolorId === 2
                  ? 5066
                  : wine.winefamily.winecolor.winecolorId === 3
                  ? 1854
                  : 2407
              }`}
            />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item container xs={10} direction="column" spacing={5}>
            <Grid item xs>
              <Typography gutterBottom variant="title1" component="div">
                {capitalize(wine.wine)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Azienda: {wine.winery.winery}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Colore: {wine.winefamily.winecolor.winecolor}
              </Typography>
              {wine.winegrapes.length > 0 && (
                <Typography variant="body2" color="text.secondary">
                  Uvaggio:{" "}
                  {wine.winegrapes.map(
                    (wg) => `${wg.winegrape.winegrape} (${wg.percentage}%) `
                  )}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                Disponibili: {wine.availability}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                <Link
                  to={`/${catalogRoute}/${wineDetailsRoute(
                    wine.wine,
                    wine.vintage
                  )}`}
                >
                  Dettagli
                </Link>
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item textAlign="center">
              <Typography variant="subtitle1" component="div">
                € {wine.price}
              </Typography>
            </Grid>
            <Grid item>
              {!admin && (
                <>
                  {cart && wine.availability > 0 && (
                    <AddToCart
                      wine={capitalize(wine.wine)}
                      vintage={wine.vintage}
                      cart={cart}
                    />
                  )}
                </>
              )}

              {admin && (
                <Fab color="primary" aria-label="edit-wine" size="small">
                  <EditIcon fontSize="small" />
                </Fab>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
