import * as React from "react";
import PropTypes from "prop-types";
import Joi from "joi";
import { useValidator } from "react-joi";

import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Typography } from "@mui/material";

import ErrorAlert from "../Common/ErrorAlert";
import useCart from "../../Hooks/Cart/useCart";

export default function CheckoutDialog({ onClose, open, ...other }) {
  const cart = useCart();

  const { state, setData, setExplicitField, validate } = useValidator({
    initialData: {
      address: "",
      creditCardNumber: "",
      cvc: "",
    },
    schema: Joi.object({
      address: Joi.string()
        .min(3)
        .required()
        .error((err) => {
          err[0].message = "Il valore deve essere un'indirizzo valido";
          return err;
        }),

      creditCardNumber: Joi.string()
        .creditCard()
        .required()
        .error((err) => {
          err[0].message = "Il valore deve essere una carta di credito valida";
          return err;
        }),
      cvc: Joi.string()
        .length(3)
        .required()
        .error((err) => {
          err[0].message = "Il cvc deve essere lungo 3 caratteri";
          return err;
        }),
    }),
    explicitCheck: {
      address: false,
      creditCardNumber: false,
      cvc: false,
    },
  });

  const { creditCardNumber, cvc, address } = state.$data;

  const setCreditCardNumber = (value) =>
    setData((old) => ({
      ...old,
      creditCardNumber: value,
    }));

  const setCvc = (value) =>
    setData((old) => ({
      ...old,
      cvc: value,
    }));

  const setAddress = (value) =>
    setData((old) => ({
      ...old,
      address: value,
    }));

  const [apiCalling, setApiCalling] = React.useState(false);

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    validate();

    if (state.$all_errors.length === 0) {
      setApiCalling(true);
      cart.pay(creditCardNumber, cvc, address, (success) => {
        setApiCalling(false);

        if (success) onClose(true);
      });
    }
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle>Checkout</DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          Stai per pagare € {cart.getTotalPrice()} a Winer
        </Typography>

        <Box component="form" onSubmit={handleOk} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="street"
            label="Indirizzo"
            name="street"
            autoFocus
            value={address}
            onChange={(props) => setAddress(props.target.value)}
            onBlur={() => setExplicitField("address", true)}
          />
          <ErrorAlert
            error={state.$errors.address.map((data) => data.$message).join(",")}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="creditCardNumber"
            label="Numero Carta di Credito"
            name="creditCardNumber"
            autoFocus
            value={creditCardNumber}
            onChange={(props) => setCreditCardNumber(props.target.value)}
            onBlur={() => setExplicitField("creditCardNumber", true)}
          />
          <ErrorAlert
            error={state.$errors.creditCardNumber
              .map((data) => data.$message)
              .join(",")}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="cvc"
            label="CVC"
            id="cvc"
            value={cvc}
            onChange={(props) => setCvc(props.currentTarget.value)}
            onBlur={() => setExplicitField("cvc", true)}
          />
          <ErrorAlert
            error={state.$errors.cvc.map((data) => data.$message).join(",")}
          />

          <LoadingButton
            type="submit"
            loading={apiCalling}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleOk}
            disabled={state.$all_errors.length > 0}
          >
            Paga
          </LoadingButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Annulla
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CheckoutDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
