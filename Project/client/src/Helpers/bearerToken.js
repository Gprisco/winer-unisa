const BEARER_TOKEN_KEY = "x-auth-token";

export function getBearerToken() {
  return localStorage.getItem(BEARER_TOKEN_KEY);
}

export function setBearerToken(token) {
  if (!!token) localStorage.setItem(BEARER_TOKEN_KEY, token);
}
