import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminPage, { adminBaseRoute } from "../Common/AdminPage";
import Loader from "../../../Components/Common/Loader";
import PageTitle from "../../../Components/Common/PageTitle";
import useWine from "../../../Hooks/Wines/useWine";
import WineForm from "../../../Components/Admin/Wines/WineForm";

export const updateWineRoute = (wine, vintage) =>
  `update-wine/${wine}/${vintage}`;

const UpdateWine = () => {
  const { wine, vintage } = useParams();
  const navigate = useNavigate();

  const [notFound, setNotFound] = useState(false);

  const [wineData, loading] = useWine(wine, vintage, (err, _) => {
    if (err) setNotFound(true);
  });

  useEffect(() => {
    if (notFound) navigate(adminBaseRoute, { replace: true });
  }, [notFound]);

  return (
    <AdminPage>
      <PageTitle title="Modifica un vino" />

      {loading && <Loader open={loading} />}

      {!loading && !notFound && (
        <WineForm
          wine={wineData.wine}
          vintage={wineData.vintage}
          price={wineData.price}
          availability={wineData.availability}
          wineryId={wineData.wineryId}
          winefamilyId={wineData.winefamilyId}
        />
      )}
    </AdminPage>
  );
};

export default UpdateWine;
