import { useState, useEffect } from "react";
import { performAuthenticatedRequest } from "../../Helpers/axios";
import { wineService } from "../../Services/routes";

export default function useWines(onError) {
  const [page, setPage] = useState(1);
  const [wineData, setWineData] = useState({});
  const [apiCalling, setApiCalling] = useState(true);

  const [wineSearch, setWineSearch] = useState("");

  async function get() {
    try {
      setApiCalling(true);

      let queryString = `?page=${page}`;

      if (!!wineSearch) queryString += `&wine=${wineSearch}`;

      const response = await performAuthenticatedRequest(
        "GET",
        wineService.wines + queryString
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
  }, [page, wineSearch]);

  return [wineData, page, setPage, apiCalling, setWineSearch];
}
