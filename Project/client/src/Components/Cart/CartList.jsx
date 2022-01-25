import { useState } from "react";
import { toast } from "react-toastify";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import WineListItem from "../../Components/Catalog/WineListItem";
import ConfirmationDialog from "../Common/ConfirmationDialog";
import { capitalize } from "../../Helpers/string";
import useCart from "../../Hooks/Cart/useCart";
import CartItemQuantity from "./CartItemQuantity";
import CartTotal from "./CartTotal";
import CheckoutDialog from "./CheckoutDialog";

const CartList = () => {
  const cart = useCart();

  const [openDialog, setOpenDialog] = useState(false);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [wineToDelete, setWineToDelete] = useState(null);

  const onDialogClose = (accepted) => {
    if (wineToDelete && accepted)
      cart.remove(wineToDelete.wine, wineToDelete.vintage);
    else setWineToDelete(null);

    setOpenDialog(false);
  };

  const onCheckoutDialogClose = (success) => {
    setOpenCheckoutDialog(false);

    if (success)
      return toast(
        "Acquisto effettuato, riceverai una mail di riepilogo dell'ordine",
        { type: toast.TYPE.SUCCESS }
      );
  };

  const onUpdate = (wine, vintage, quantity) => {
    if (quantity > 0) cart.update(wine, vintage, quantity);
    else {
      setWineToDelete({ wine, vintage });
      setOpenDialog(true);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
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

      <Grid item xs={12}>
        <Button variant="contained" onClick={() => setOpenCheckoutDialog(true)}>
          Procedi al Checkout
        </Button>
      </Grid>

      <CheckoutDialog
        open={openCheckoutDialog}
        onClose={onCheckoutDialogClose}
      />
    </Grid>
  );
};

export default CartList;
