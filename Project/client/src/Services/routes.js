export const basePath = "/api/v1";

export const authService = {
  login: basePath + "/auth/login",
  getProfile: basePath + "/auth/profile",
  register: basePath + "/auth/register",
};

export const wineService = {
  wines: basePath + "/wine",
  wine: (name, vintage) => wineService.wines + `/${name}/${vintage}`,
};

export const cartService = {
  cart: basePath + "/cart",
  cartItem: (wine, vintage) => cartService.cart + `/${wine}/${vintage}`,
};

export const paymentService = {
  pay: basePath + "/payment",
};

export const winegrapeService = {
  winegrapes: basePath + "/winegrape",
};

export const wineryService = {
  wineries: basePath + "/winery",
};

export const winefamilyService = {
  winefamilies: basePath + "/winefamily",
};
