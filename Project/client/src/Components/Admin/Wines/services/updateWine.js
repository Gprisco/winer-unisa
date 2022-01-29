import { performAuthenticatedRequest } from "../../../../Helpers/axios";
import { wineService } from "../../../../Services/routes";

export async function updateWine(wine, vintage, wineData, cb) {
  try {
    const response = await performAuthenticatedRequest(
      "PATCH",
      wineService.wine(wine, vintage),
      wineData
    );

    cb(null, response.data);
  } catch (error) {
    cb(error, null);
  }
}
