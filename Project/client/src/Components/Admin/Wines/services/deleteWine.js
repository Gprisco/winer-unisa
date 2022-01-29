import { performAuthenticatedRequest } from "../../../../Helpers/axios";
import { wineService } from "../../../../Services/routes";

export async function deleteWine(wine, vintage, cb) {
  try {
    const response = await performAuthenticatedRequest(
      "DELETE",
      wineService.wine(wine, vintage)
    );

    cb(null, response.data);
  } catch (error) {
    cb(error, null);
  }
}
