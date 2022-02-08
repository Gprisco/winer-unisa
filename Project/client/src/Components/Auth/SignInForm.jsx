import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Copyright from "../Common/Copyright";
import ErrorAlert from "../Common/ErrorAlert";

import { signUpRoute } from "../../Pages/Auth/SignUp";

export default function SignInForm({
  email,
  password,
  onEmail,
  onPassword,
  error,
  onCloseError,
  onSubmit,
  apiCalling,
}) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Accedi
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(props) => onEmail(props.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(props) => onPassword(props.currentTarget.value)}
          />
          <LoadingButton
            type="submit"
            loading={apiCalling}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Accedi
          </LoadingButton>
          <ErrorAlert error={error} onCloseError={onCloseError} />
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              <Link href={signUpRoute} variant="body2">
                {"Non hai un account? Registrati"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
