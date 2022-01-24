import { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import WineListItem from "../../Components/Catalog/WineListItem";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import { capitalize } from "../../Helpers/string";
import CartItemQuantity from "./CartItemQuantity";
import CartTotal from "./CartTotal";

const CartList = ({ cart }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [wineToDelete, setWineToDelete] = useState(null);

  const onDialogClose = (accepted) => {
    if (wineToDelete && accepted)
      cart.remove(wineToDelete.wine, wineToDelete.vintage);
    else setWineToDelete(null);

    setOpenDialog(false);
  };

  const onUpdate = (wine, vintage, quantity) => {
    if (quantity > 0) cart.update(wine, vintage, quantity);
    else {
      setWineToDelete({ wine, vintage });
      setOpenDialog(true);
    }
  };

  return (
    <Grid container direction="column" justifyContent="center" spacing={1}>
      <ConfirmationDialog
        open={openDialog}
        onClose={onDialogClose}
        question={`Sei sicuro di voler eliminare 
        dal carrello il vino 
        '${wineToDelete ? capitalize(wineToDelete.wine) : ""} ${
          wineToDelete ? wineToDelete.vintage : ""
        }'?`}
      />

      {cart.cart.length === 0 && (
        <Grid item xs>
          <Typography variant="h6" textAlign="center">
            Il Carrello è vuoto
          </Typography>
        </Grid>
      )}

      {cart.cart.length > 0 &&
        cart.cart.map((cartItem) => (
          <Grid
            key={`${cartItem.winePK}${cartItem.vintage}`}
            item
            container
            xs
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={8}>
              <WineListItem wine={cartItem.wine} />
            </Grid>

            <CartItemQuantity cartItem={cartItem} onUpdate={onUpdate} />
          </Grid>
        ))}

      <CartTotal items={cart.cart} />
    </Grid>
  );
};

export default CartList;
