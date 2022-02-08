import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({ open }) => {
  return (
    <Backdrop
      id="loader"
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default Loader;
