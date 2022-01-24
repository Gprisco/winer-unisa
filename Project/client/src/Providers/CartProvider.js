import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CartContext from "../Contexts/CartContext";
import { performAuthenticatedRequest } from "../Helpers/axios";
import { cartService } from "../Services/routes";

const cartProvider = {
  async getCart(cb) {
    try {
      const response = await performAuthenticatedRequest(
        "GET",
        cartService.cart
      );

      cb(response.data);
    } catch (error) {
      cb([]);
    }
  },
  async add(wine, vintage, cb) {
    try {
      const response = await performAuthenticatedRequest(
        "POST",
        cartService.cart,
        {
          winePK: wine,
          vintage,
          quantity: 1,
        }
      );

      cb(null, response.data);
    } catch (error) {
      cb(error.response, null);
    }
  },
  async update(wine, vintage, quantity, cb) {
    try {
      const response = await performAuthenticatedRequest(
        "PATCH",
        cartService.cartItem(wine, vintage),
        {
          quantity: +quantity,
        }
      );

      cb(null, response.data);
    } catch (error) {
      cb(error.response, null);
    }
  },
  async remove(wine, vintage, cb) {
    try {
      const response = await performAuthenticatedRequest(
        "DELETE",
        cartService.cartItem(wine, vintage)
      );

      cb(null, response.data);
    } catch (error) {
      cb(error.response, null);
    }
  },
};

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  function getCart() {
    console.log("calling get");
    cartProvider.getCart((cart) => setCart(cart));
  }

  function add(wine, vintage, cb = () => {}) {
    console.log("calling add");
    return cartProvider.add(wine, vintage, (err, data) => {
      if (err)
        return toast(JSON.stringify(err.data), { type: toast.TYPE.ERROR });

      toast(`${wine} ${vintage} aggiunto al carrello`, {
        type: toast.TYPE.SUCCESS,
      });
      getCart();
      cb(data);
    });
  }

  function update(wine, vintage, quantity, cb = () => {}) {
    return cartProvider.update(wine, vintage, quantity, (err, data) => {
      if (err)
        return toast(
          err && err.data && err.data.message
            ? err.data.message[0]
            : JSON.stringify(err),
          { type: "error" }
        );

      setCart(
        cart.map((item) => {
          if (item.winePK === wine && item.vintage === vintage)
            item.quantity = quantity;

          return item;
        })
      );
      cb(data);
    });
  }

  function remove(wine, vintage, cb = () => {}) {
    return cartProvider.remove(wine, vintage, (err, data) => {
      if (err) return toast(JSON.stringify(err.data), { type: "error" });

      setCart(
        cart.filter((item) => item.winePK !== wine && item.vintage !== vintage)
      );
      cb(data);
    });
  }

  const value = { cart, getCart, add, update, remove };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
