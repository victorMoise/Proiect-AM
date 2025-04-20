import {
  Autocomplete,
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
  const { open, onClose, propsSong, onRefetch } = props;
  const { toast, handleClose, showToast } = useToast();
  const { t } = useTranslation("common");
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artist, setArtist] = useState(null);
  const [genre, newGenre] = useState(null);
  const [title, setTitle] = useState(propsSong.title);
  const [isPublic, setIsPublic] = useState(propsSong.isPublic);

  const handleTitleChange = useCallback((e) => {
    const { value } = e.target;
    setTitle(value);
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

  useEffect(() => {
    setArtist(artists.find((a) => a?.id === propsSong.artistId) || null);
    newGenre(genres.find((g) => g?.id === propsSong.genreId) || null);
  }, [propsSong.artistId, propsSong.genreId, artists, genres]);

  const handleArtistChange = useCallback((_event, newValue) => {
    setArtist(newValue);
  }, []);

  const handleGenreChange = useCallback((_event, newValue) => {
    newGenre(newValue);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const updatedSong = {
        songId: propsSong.id,
        songTitle: title,
        artistId: artist?.id,
        genreId: genre?.id,
        isPublic: isPublic,
      };
      await axiosInstance.put(endpoints.songs.generic, updatedSong);
      showToast(t("MyMusic.Upload.EditSuccess"), "success");
      onRefetch();
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      showToast(
        error?.response?.data?.message ||
          error?.message ||
          t("MyMusic.Upload.EditError"),
        "error"
      );
    }
  }, [
    propsSong,
    title,
    artist,
    genre,
    isPublic,
    showToast,
    t,
    onRefetch,
    onClose,
  ]);

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
              value={title}
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={artists || []}
              value={artist}
              getOptionLabel={(option) => option.name}
              onChange={handleArtistChange}
              renderInput={(params) => (
                <TextField {...params} label={t("Home.Songs.Artist")} />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              fullWidth
              options={genres || []}
              value={genre}
              getOptionLabel={(option) => option.name}
              onChange={handleGenreChange}
              renderInput={(params) => (
                <TextField {...params} label={t("Home.Songs.Genre")} />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              fullWidth
              options={[
                { label: t("Common.Yes"), value: true },
                { label: t("Common.No"), value: false },
              ]}
              value={
                isPublic
                  ? { label: t("Common.Yes"), value: true }
                  : { label: t("Common.No"), value: false }
              }
              getOptionLabel={(option) => option.label}
              onChange={(_event, newValue) => setIsPublic(newValue?.value)}
              renderInput={(params) => (
                <TextField {...params} label={t("MyMusic.Upload.IsPublic")} />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="contained">
          {t("Common.Cancel")}
        </Button>
        <Button onClick={handleSave} color="success" variant="contained">
          {t("Common.Save")}
        </Button>
      </DialogActions>
      <Toast toast={toast} handleClose={handleClose} />
    </Dialog>
  );
};

export default EditDialog;
