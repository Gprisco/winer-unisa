import { performAuthenticatedRequest } from "../../../../Helpers/axios";
import { wineService } from "../../../../Services/routes";

export async function addWine(wineData, cb) {
  try {
    const response = await performAuthenticatedRequest(
      "POST",
      wineService.wines,
      wineData
    );

    cb(null, response.data);
  } catch (error) {
    cb(error, null);
  }
}
