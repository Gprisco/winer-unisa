import { useState } from "react";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddWinegrapeDialog from "./AddWinegrapeDialog";

const AddWineForm = () => {
  const [openWinegrapeDialog, setOpenWinegrapeDialog] = useState(false);
  const [apiCalling, setApiCalling] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container component="main">
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        sx={{ mt: 1 }}
        autoComplete="off"
      >
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="wine"
              label="Vino"
              name="wine"
              autoFocus
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="vintage"
              label="Annata"
              type="number"
              id="vintage"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Prezzo"
              type="number"
              id="price"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="availability"
              label="Bottiglie Disponibili"
              type="number"
              id="availability"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="produttore-label" htmlFor="produttore-select">
                Produttore
              </InputLabel>
              <Select
                labelId="produttore-label"
                id="produttore-select"
                label="Produttore"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="famiglia-label">Famiglia</InputLabel>
              <Select
                labelId="famiglia-label"
                id="famiglia-select"
                label="Famiglia"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            xs={12}
          >
            <Button onClick={() => setOpenWinegrapeDialog(true)}>
              Aggiungi Uva
            </Button>
          </Grid>
          <AddWinegrapeDialog
            open={openWinegrapeDialog}
            setOpen={setOpenWinegrapeDialog}
            winegrapes={[]}
          />
        </Grid>

        <LoadingButton
          type="submit"
          loading={apiCalling}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Crea
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default AddWineForm;
