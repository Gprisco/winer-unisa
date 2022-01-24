import Typography from "@mui/material/Typography";

const PageTitle = ({ title }) => {
  return (
    <Typography variant="h3" sx={{ marginY: "30px", marginX: "50px" }}>
      {title}
    </Typography>
  );
};

export default PageTitle;
