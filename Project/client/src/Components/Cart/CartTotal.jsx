import PropTypes from "prop-types";
import { Typography, Grid } from "@mui/material";
import useCart from "../../Hooks/Cart/useCart";

const CartTotal = () => {
  const cart = useCart();

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
          € {cart.getTotalPrice()}
        </Typography>
      </Grid>
    </Grid>
  );
};

CartTotal.propTypes = {
  items: PropTypes.array.isRequired,
};

export default CartTotal;
