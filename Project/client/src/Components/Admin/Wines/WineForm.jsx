import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import Joi from "joi";
import { useValidator } from "react-joi";

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
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

import AddWinegrapeDialog from "./AddWinegrapeDialog";

import { addWine } from "./services/addWine";
import useWineFeature from "../../../Hooks/AdminWineData/useWineFeature";
import {
  winefamilyService,
  winegrapeService,
  wineryService,
} from "../../../Services/routes";
import { updateWine } from "./services/updateWine";
import { adminBaseRoute } from "../../../Pages/Admin/Common/AdminPage";
import { adminWineList } from "../../../Pages/Admin/Wines/AdminWineList";

const WineForm = ({
  wine,
  vintage,
  price,
  availability,
  wineryId,
  winefamilyId,
  wineWinegrapes,
}) => {
  const [apiCalling, setApiCalling] = useState(true);

  const winegrapes = useWineFeature(winegrapeService.winegrapes);
  const wineries = useWineFeature(wineryService.wineries);
  const winefamilies = useWineFeature(winefamilyService.winefamilies);

  useEffect(() => {
    if (!!winegrapes && !!wineries && !!winefamilies) setApiCalling(false);

    return () => {};
  }, [winegrapes, wineries, winefamilies]);

  const [openWinegrapeDialog, setOpenWinegrapeDialog] = useState(false);
  const [chosenWinegrapes, setChosenWinegrapes] = useState(
    wineWinegrapes || []
  );

  const { state, setData, setExplicitField, validate } = useValidator({
    initialData: {
      wine: wine || "",
      vintage: vintage || new Date().getFullYear(),
      price: price || 10,
      availability: availability || 10,
      wineryId: wineryId || -1,
      winefamilyId: winefamilyId || -1,
    },
    schema: Joi.object({
      wine: Joi.string().min(1).required(),
      vintage: Joi.number().integer().min(0).required(),
      price: Joi.number().min(0.01).required(),
      availability: Joi.number().integer().min(0).required(),
      wineryId: Joi.number().integer().min(0).required(),
      winefamilyId: Joi.number().integer().min(0).required(),
    }),
    explicitCheck: {
      wine: false,
      vintage: false,
      cvc: false,
      price: false,
      availability: false,
      wineryId: false,
      winefamilyId: false,
    },
  });

  const onWinegrapeChoice = (cancelled, winegrapeId, percentage, winegrape) => {
    setOpenWinegrapeDialog(false);

    if (
      chosenWinegrapes.filter((wg) => wg.winegrapeId === winegrapeId).length > 0
    )
      return;

    if (!cancelled) {
      let percentageSum = 0;
      for (let wg of chosenWinegrapes) percentageSum += wg.percentage;

      if (percentageSum + percentage > 100)
        return toast(
          "La somma delle percentuali dell'uvaggio deve essere inferiore a 100",
          {
            type: toast.TYPE.ERROR,
          }
        );

      const winegrapes = [
        ...chosenWinegrapes,
        { winegrapeId, percentage, winegrape },
      ];
      setChosenWinegrapes(winegrapes);
    }
  };

  const onWinegrapeRemove = (winegrapeId) => {
    setChosenWinegrapes(
      chosenWinegrapes.filter((wg) => wg.winegrapeId !== winegrapeId)
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    validate();

    const responseCb = (successMessage) => (err, _) => {
      setApiCalling(false);

      if (err)
        return toast(err.response.data.message[0], {
          type: toast.TYPE.ERROR,
        });

      toast(successMessage, { type: toast.TYPE.SUCCESS });
    };

    if (state.$all_errors.length === 0) {
      setApiCalling(true);

      if (wine && vintage) {
        // User is updating wine

        return updateWine(
          wine,
          vintage,
          {
            wine: state.$data.wine,
            vintage: +state.$data.vintage,
            wineryId: state.$data.wineryId,
            winefamilyId: state.$data.winefamilyId,
            price: state.$data.price,
            availability: state.$data.availability,
            winegrapes: chosenWinegrapes.map(({ winegrapeId, percentage }) => ({
              winegrapeId,
              percentage,
            })),
          },
          responseCb("Vino aggiornato correttamente!")
        );
      }

      addWine(
        {
          wine: state.$data.wine,
          vintage: +state.$data.vintage,
          wineryId: state.$data.wineryId,
          winefamilyId: state.$data.winefamilyId,
          price: state.$data.price,
          availability: state.$data.availability,
          winegrapes: chosenWinegrapes.map(({ winegrapeId, percentage }) => ({
            winegrapeId,
            percentage,
          })),
        },
        responseCb("Vino aggiungo correttamente!")
      );
    }
  };

  const setState = (newState) => {
    setData((old) => ({ ...old, ...newState }));
  };

  return (
    <Container component="main">
      <Box
        component="form"
        onSubmit={onSubmit}
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
              value={state.$data.wine}
              onChange={(e) => setState({ wine: e.target.value })}
              onBlur={() => setExplicitField("wine", true)}
              error={state.$errors.wine.length > 0}
              helperText={state.$errors.wine
                .map((data) => data.$message)
                .join(",")}
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
              value={state.$data.vintage}
              onChange={(e) => setState({ vintage: e.target.value })}
              error={state.$errors.vintage.length > 0}
              helperText={state.$errors.vintage
                .map((data) => data.$message)
                .join(",")}
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
              value={state.$data.price}
              onChange={(e) => setState({ price: e.target.value })}
              error={state.$errors.price.length > 0}
              helperText={state.$errors.price
                .map((data) => data.$message)
                .join(",")}
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
              value={state.$data.availability}
              onChange={(e) => setState({ availability: e.target.value })}
              error={state.$errors.availability.length > 0}
              helperText={state.$errors.availability
                .map((data) => data.$message)
                .join(",")}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={state.$errors.wineryId.length > 0}>
              <InputLabel id="produttore-label" htmlFor="produttore-select">
                Produttore
              </InputLabel>
              <Select
                labelId="produttore-label"
                id="produttore-select"
                label="Produttore"
                value={state.$data.wineryId}
                onChange={(e) => setState({ wineryId: e.target.value })}
              >
                <MenuItem value={-1}>Seleziona un produttore</MenuItem>
                {wineries.map((wn) => (
                  <MenuItem key={wn.wineryId} value={wn.wineryId}>
                    {wn.winery}
                  </MenuItem>
                ))}
              </Select>
              {state.$errors.wineryId.length > 0 && (
                <FormHelperText>
                  {state.$errors.wineryId
                    .map((data) => data.$message)
                    .join(",")}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={state.$errors.winefamilyId.length > 0}
            >
              <InputLabel id="famiglia-label">Famiglia</InputLabel>
              <Select
                labelId="famiglia-label"
                id="famiglia-select"
                label="Famiglia"
                value={state.$data.winefamilyId}
                onChange={(e) => setState({ winefamilyId: e.target.value })}
              >
                <MenuItem value={-1}>Seleziona una famiglia</MenuItem>
                {winefamilies.map((wf) => (
                  <MenuItem key={wf.winefamilyId} value={wf.winefamilyId}>
                    {wf.winefamily}
                  </MenuItem>
                ))}
              </Select>
              {state.$errors.winefamilyId.length > 0 && (
                <FormHelperText>
                  {state.$errors.winefamilyId
                    .map((data) => data.$message)
                    .join(",")}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            xs={12}
          >
            {chosenWinegrapes.map((wg) => (
              <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                xs={12}
                key={wg.winegrapeId}
              >
                <Typography variant="body1">
                  {
                    winegrapes.filter(
                      (wg1) => wg1.winegrapeId === wg.winegrapeId
                    )[0].winegrape
                  }{" "}
                  - {wg.percentage} %
                </Typography>

                <Button onClick={() => onWinegrapeRemove(wg.winegrapeId)}>
                  Rimuovi
                </Button>
              </Grid>
            ))}
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
            onClose={onWinegrapeChoice}
            winegrapes={winegrapes}
          />
        </Grid>

        <LoadingButton
          type="submit"
          loading={apiCalling}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={state.$all_errors.length > 0}
        >
          {wine && vintage ? "Modifica" : "Crea"}
        </LoadingButton>

        <Link to={adminBaseRoute + "/" + adminWineList}>
          <Button
            color="error"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Indietro
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default WineForm;
