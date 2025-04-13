import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../utils/axios";
import { endpoints } from "../../../utils/endpoints";
import useToast from "../../../hooks/useToast";
import Toast from "../../../common/components/Toast";

const EditDialog = (props) => {
  const { open, onClose, onSave, propsSong } = props;
  const { toast, showToast, handleClose } = useToast();
  const { t } = useTranslation("common");
  const [song, setSong] = useState(propsSong);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  const handleTitleChange = useCallback((e) => {
    setSong((prevSong) => ({ ...prevSong, title: e.target.value }));
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosInstance.get(endpoints.songs.genres);
        setGenres(response.data);
      } catch (error) {
        showToast(
          error?.response?.data?.message ||
            error?.message ||
            t("MyMusic.Upload.ErrorFetchingGenres"),
          "error"
        );
      }
    };

    const fetchArtists = async () => {
      try {
        const response = await axiosInstance.get(endpoints.songs.artists);
        setArtists(response.data);
      } catch (error) {
        showToast(
          error?.response?.data?.message ||
            error?.message ||
            t("MyMusic.Upload.ErrorFetchingArtists"),
          "error"
        );
      }
    };

    fetchGenres();
    fetchArtists();
  }, [showToast, t]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "background.default",
        },
      }}
    >
      <DialogTitle>{t("Common.Edit")}</DialogTitle>
      <DialogContent>
        <Grid container xs={12} spacing={2} marginTop={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t("Home.Songs.Title")}
              value={song.title}
              onChange={handleTitleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          {t("Common.Cancel")}
        </Button>
        <Button onClick={onSave} color="success" variant="contained">
          {t("Common.Save")}
        </Button>
      </DialogActions>
      <Toast toast={toast} handleClose={handleClose} />
    </Dialog>
  );
};

export default EditDialog;
