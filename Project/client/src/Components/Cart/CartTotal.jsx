import PropTypes from "prop-types";
import { Typography, Grid } from "@mui/material";

const CartTotal = ({ items }) => {
  return (
    <Grid
      item
      container
      spacing={5}
      justifyContent="center"
      alignItems="center"
      sx={{ marginY: "20px" }}
    >
      <Grid item container xs justifyContent="center">
        <Typography variant="h5">Totale</Typography>
      </Grid>

      <Grid item container xs justifyContent="center">
        <Typography variant="h5" color="text.secondary">
          €{" "}
          {items.reduce(
            (prev, next) =>
              (prev ? prev.wine.price : 0) + (next ? next.wine.price : 0),
            0
          )}
        </Typography>
      </Grid>
    </Grid>
  );
};

CartTotal.propTypes = {
  items: PropTypes.array.isRequired,
};

export default CartTotal;
