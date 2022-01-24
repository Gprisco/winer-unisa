import axios from "axios";
import { getBearerToken } from "./bearerToken";

export async function performAuthenticatedRequest(
  method,
  url,
  data = null,
  headers = {}
) {
  return await axios({
    method,
    url,
    data,
    headers: { authorization: "Bearer " + getBearerToken(), ...headers },
  });
}
