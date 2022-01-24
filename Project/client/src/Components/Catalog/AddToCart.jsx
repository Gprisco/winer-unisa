import Fab from "@mui/material/Fab";
import { ShoppingCart } from "@mui/icons-material";

const AddToCart = ({ wine, vintage, cart }) => {
  const onAdd = () =>
    cart.add(wine.toLowerCase(), vintage, () => console.log(cart.cart));

  return (
    <Fab color="primary" aria-label="add-to-cart" size="small" onClick={onAdd}>
      <ShoppingCart fontSize="small" />
    </Fab>
  );
};

export default AddToCart;
