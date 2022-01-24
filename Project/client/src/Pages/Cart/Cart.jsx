import PageTitle from "../../Components/Common/PageTitle";
import CartList from "../../Components/Cart/CartList";
import useCart from "../../Hooks/Cart/useCart";

export const cartRoute = "/cart";

const Cart = () => {
  const cart = useCart();

  return (
    <>
      <PageTitle title="Carrello" />
      <CartList cart={cart} />
    </>
  );
};

export default Cart;
