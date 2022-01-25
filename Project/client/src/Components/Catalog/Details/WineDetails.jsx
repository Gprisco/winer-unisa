import { Grid, Typography, ButtonBase } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { capitalize } from "../../../Helpers/string";
import useCart from "../../../Hooks/Cart/useCart";
import { WineImg } from "../WineListItem";
import AddToCart from "../AddToCart";
import PageTitle from "../../Common/PageTitle";

const WineDetails = ({ wine }) => {
  const cart = useCart();
  const location = useLocation();

  return (
    <Grid container direction="column">
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <Link to={location.state?.from?.pathname || "/"}>
            {"<"} Torna indietro
          </Link>
        </Grid>

        <Grid item>
          <PageTitle title={capitalize(wine.wine)} />
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container>
          <Grid item>
            <ButtonBase sx={{ width: "auto", height: 512 }}>
              <WineImg
                alt="Bottle"
                src="https://wineboard.io/api/wine/image/10633"
              />
            </ButtonBase>
          </Grid>
          <Grid
            item
            xs={12}
            sm
            container
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              container
              xs={10}
              direction="column"
              alignItems="center"
              justifyContent="center"
              spacing={5}
            >
              <Grid item xs>
                <Typography variant="body1" gutterBottom>
                  Produttore: {wine.winery.winery}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Famiglia: {wine.winefamily.winefamily}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Colore: {wine.winefamily.winecolor.winecolor}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Tipologia: {wine.winefamily.winetype.winetype}
                </Typography>
                {wine.winegrapes.length > 0 && (
                  <Typography variant="body1" gutterBottom>
                    Uvaggio:{" "}
                    {wine.winegrapes.map(
                      (wg) => `${wg.winegrape.winegrape} (${wg.percentage}%) `
                    )}
                  </Typography>
                )}
                <Typography variant="body1" color="text.secondary">
                  Disponibili: {wine.availability}
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
                {cart && wine.availability > 0 && (
                  <AddToCart
                    wine={capitalize(wine.wine)}
                    vintage={wine.vintage}
                    cart={cart}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WineDetails;
