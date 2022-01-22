import Alert from "@mui/material/Alert";

const ErrorAlert = ({ error, onCloseError }) => {
  return (
    <>
      {!!error && (
        <Alert severity="error" onClose={onCloseError} sx={{ marginY: "10px" }}>
          {error}
        </Alert>
      )}
    </>
  );
};

export default ErrorAlert;
