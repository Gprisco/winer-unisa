import PageTitle from "../../Components/Common/PageTitle";
import CartList from "../../Components/Cart/CartList";

export const cartRoute = "cart";

const Cart = () => {
  return (
    <>
      <PageTitle title="Carrello" />
      <CartList />
    </>
  );
};

export default Cart;
