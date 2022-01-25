import { useState, useEffect } from "react";
import { performAuthenticatedRequest } from "../../Helpers/axios";
import { wineService } from "../../Services/routes";

export default function useWines(wine, vintage, onError) {
  const [wineData, setWineData] = useState({});
  const [apiCalling, setApiCalling] = useState(true);

  async function get() {
    try {
      setApiCalling(true);

      const response = await performAuthenticatedRequest(
        "GET",
        wineService.wine(wine, vintage)
      );

      setWineData(response.data);
      setApiCalling(false);
    } catch (error) {
      onError(error);
    }
  }

  useEffect(() => {
    get();
  }, []);

  return [wineData, apiCalling];
}
