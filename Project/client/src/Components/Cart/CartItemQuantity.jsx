import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Add, Remove } from "@mui/icons-material";

const CartItemQuantity = ({ cartItem, onUpdate }) => {
  return (
    <Grid
      item
      container
      xs={12}
      md
      direction="row"
      justifyContent="left"
      alignItems="center"
    >
      <Grid item container justifyContent="center" alignItems="center" xs>
        <Fab
          size="small"
          color="primary"
          onClick={() =>
            onUpdate(cartItem.winePK, cartItem.vintage, cartItem.quantity - 1)
          }
        >
          <Remove />
        </Fab>
      </Grid>

      <Grid item xs textAlign="center">
        <Typography textAlign="center">{cartItem.quantity}</Typography>
      </Grid>

      <Grid item container justifyContent="center" alignItems="center" xs>
        <Fab
          size="small"
          color="primary"
          onClick={() =>
            onUpdate(cartItem.winePK, cartItem.vintage, cartItem.quantity + 1)
          }
        >
          <Add />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default CartItemQuantity;
