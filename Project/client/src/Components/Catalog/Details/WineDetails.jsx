import { Grid, Typography, ButtonBase } from "@mui/material";
import { capitalize } from "../../../Helpers/string";
import useCart from "../../../Hooks/Cart/useCart";
import { WineImg } from "../WineListItem";
import AddToCart from "../AddToCart";

const WineDetails = ({ wine }) => {
  const cart = useCart();

  return (
    <Grid container direction="column">
      <Grid
        item
        container
        direction="row"
        xs={6}
        justifyContent="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item container xs={4} justifyContent="flex-end">
          <ButtonBase sx={{ width: "auto", height: 512, marginX: "auto" }}>
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
        <Grid
          item
          xs={"auto"}
          sm
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            item
            container
            xs={8}
            direction="column"
            alignItems="flex-start"
            justifyContent="center"
            spacing={5}
          >
            <Grid
              item
              container
              alignItems="flex-start"
              direction="column"
              xs
              spacing={2}
            >
              <Grid item xs>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 500 }}>
                  {capitalize(wine.wine)}
                </Typography>
              </Grid>

              <Grid
                item
                container
                alignItems="center"
                direction="row"
                xs
                spacing={2}
              >
                <Grid item xs={6} md={2}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: 500 }}
                    textAlign="center"
                  >
                    € {wine.price}
                  </Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                  {cart && wine.availability > 0 && (
                    <AddToCart
                      wine={capitalize(wine.wine)}
                      vintage={wine.vintage}
                      cart={cart}
                    />
                  )}{" "}
                </Grid>
              </Grid>
            </Grid>

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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WineDetails;
