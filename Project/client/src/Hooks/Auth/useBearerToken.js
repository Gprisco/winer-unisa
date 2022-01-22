import { useState, useEffect } from "react";
import { getBearerToken, setBearerToken } from "../../Helpers/bearerToken";

export function useBearerToken() {
  const [token, setToken] = useState(getBearerToken());

  useEffect(() => {
    setBearerToken(token);
  }, [token]);

  return [token, setToken];
}
