import { useState, useEffect } from "react";
import { performAuthenticatedRequest } from "../../Helpers/axios";
import { wineService } from "../../Services/routes";

export default function useWines(onError) {
  const [page, setPage] = useState(1);
  const [wineData, setWineData] = useState({});
  const [apiCalling, setApiCalling] = useState(true);

  const [wineSearch, setWineSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);

  async function get() {
    try {
      setApiCalling(true);

      let queryString = `?page=${page}`;

      if (!!wineSearch) queryString += `&wine=${wineSearch}`;

      if (priceRange[1] > 0)
        queryString += `&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`;

      const response = await performAuthenticatedRequest(
        "GET",
        wineService.wines + queryString
      );

      setWineData(response.data);
      if (priceRange[1] < response.data.maxPrice)
        setPriceRange([0, response.data.maxPrice]);
      setApiCalling(false);
    } catch (error) {
      onError(error);
    }
  }

  useEffect(() => {
    if (page > 0) get();

    return () => {};
  }, [page, wineSearch, priceRange]);

  return [
    wineData,
    page,
    setPage,
    apiCalling,
    setWineSearch,
    priceRange,
    setPriceRange,
    setWineData,
  ];
}
