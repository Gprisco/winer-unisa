import { createContext } from "react";

export default createContext({
  cart: null,
  add: (wine, vintage, cb) => {},
  update: (wine, vintage, quantity, cb) => {},
  remove: (wine, vintage, cb) => {},
  getCart: () => {},
  buy: (creditCardNumber, cvc, cb) => {},
  getTotalPrice: () => {},
});
