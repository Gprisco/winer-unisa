import { useParams, useNavigate, useLocation } from "react-router-dom";
import WineDetails from "../../Components/Catalog/Details/WineDetails";

import Loader from "../../Components/Common/Loader";

import useWine from "../../Hooks/Wines/useWine";

export const wineDetailsRoute = (wine, vintage) => `${wine}/${vintage}`;

const WineDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wine, vintage } = useParams();
  const [wineData, loading] = useWine(wine, vintage, () => {
    navigate(location.state?.from?.pathname || "/", { replace: true });
  });

  return (
    <>
      <Loader open={loading} />

      {!loading && <WineDetails wine={wineData} />}
    </>
  );
};

export default WineDetailsPage;
