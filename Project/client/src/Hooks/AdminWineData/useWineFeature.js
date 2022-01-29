import { useState, useEffect } from "react";
import { performAuthenticatedRequest } from "../../Helpers/axios";

export default function useWineFeature(endpoint) {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await performAuthenticatedRequest("GET", endpoint);

        setData(response.data);
      } catch (error) {
        console.error(error.response);
        setData([]);
      }
    })();
  }, []);

  return data;
}
