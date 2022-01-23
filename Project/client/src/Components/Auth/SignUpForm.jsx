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

import { signInRoute } from "../../Pages/Auth/SignIn";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignUpForm({
  email,
  password,
  confirmPassword,
  onEmail,
  onPassword,
  onConfirmPassword,
  error,
  onCloseError,
  onSubmit,
  apiCalling,
}) {
  return (
    <ThemeProvider theme={theme}>
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
            Registrati
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

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(props) => onConfirmPassword(props.currentTarget.value)}
            />

            <LoadingButton
              type="submit"
              loading={apiCalling}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrati
            </LoadingButton>

            <ErrorAlert error={error} onCloseError={onCloseError} />

            <Grid container sx={{ justifyContent: "center" }}>
              <Grid item>
                <Link href={signInRoute} variant="body2">
                  {"Hai già un account? Accedi"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
