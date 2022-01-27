import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

export default function AddWinegrapeDialog({ winegrapes, open, setOpen }) {
  const [winegrapeId, setWinegrapeId] = React.useState(-1);
  const [percentage, setPercentage] = React.useState(100);

  const handleChange = (event) => {
    setWinegrapeId(+event.target.value || -1);
  };

  const handleClose = (ok) => {
    // if (ok)
    // Call setWinegrapeWithPercentage
    setOpen(false);
  };

  return (
    <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      <DialogTitle>Scegli l'uva e la percentuale</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 1 }} autoComplete="off">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} paddingTop="5px">
              <FormControl fullWidth>
                <InputLabel margin="dense" id="winegrapeId-label">
                  Uva
                </InputLabel>
                <Select
                  labelId="winegrapeId-label"
                  label="Uva"
                  value={winegrapeId}
                  onChange={handleChange}
                  margin="dense"
                >
                  <MenuItem value={-1}>Seleziona un'uva</MenuItem>
                  {winegrapes.map((wg) => (
                    <MenuItem key={wg.id} value={wg.id}>
                      {wg.winegrape}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="percentage"
                  label="Percentuale"
                  type="number"
                  id="percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(+e.currentTarget.value || 0)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={() => handleClose(true)}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}
