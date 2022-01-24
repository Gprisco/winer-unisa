import Fab from "@mui/material/Fab";
import { ShoppingCart } from "@mui/icons-material";

const AddToCart = () => {
  return (
    <Fab color="primary" aria-label="add-to-cart" size="small">
      <ShoppingCart fontSize="small" />
    </Fab>
  );
};

export default AddToCart;
