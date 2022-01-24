import { useContext } from "react";
import CartContext from "../../Contexts/CartContext";

export default function useCart() {
  return useContext(CartContext);
}
