import { useState, useEffect } from "react";
import { performAuthenticatedRequest } from "../../Helpers/axios";
import { wineService } from "../../Services/routes";

export default function useWines(onError) {
  const [page, setPage] = useState(1);
  const [wineData, setWineData] = useState({});
  const [apiCalling, setApiCalling] = useState(true);

  async function get() {
    try {
      setApiCalling(true);

      const response = await performAuthenticatedRequest(
        "GET",
        wineService.wines + `?page=${page}`
      );

      setWineData(response.data);
      setApiCalling(false);
    } catch (error) {
      onError(error);
    }
  }

  useEffect(() => {
    if (page > 0) get();

    return () => {};
  }, [page]);

  return [wineData, page, setPage, apiCalling];
}
