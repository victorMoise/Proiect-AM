import React, { useCallback, useEffect, useState } from "react";
import { StyledCard } from "../../../common/styles";
import ListComponent from "./ListComponent";
import useToast from "../../../hooks/useToast";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../utils/axios";
import { endpoints } from "../../../utils/endpoints";
import Toast from "../../../common/components/Toast";
import EditDialog from "./EditDialog";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ListContainer = ({ refreshKey }) => {
  const { t } = useTranslation("common");
  const { toast, showToast, handleClose } = useToast();

  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [songToDelete, setSongToDelete] = useState(null);

  const fetchSongsList = useCallback(async () => {
    try {
      const songsList = await axiosInstance.get(endpoints.songs.userUploads);
      setSongs(songsList.data);
    } catch (err) {
      showToast(err.message || t("Home.Error.FetchingData"), "error");
    } finally {
      setLoading(false);
    }
  }, [showToast, t]);

    useEffect(() => {
      fetchSongsList(); 
    }, [fetchSongsList, refreshKey]);

  useEffect(() => {
    fetchSongsList();
  }, [fetchSongsList]);

  const handleOpenDialog = useCallback((song) => {
    setEditDialogOpen(true);
    setSelectedSong(song);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setEditDialogOpen(false);
    setSelectedSong(null);
  }, []);

  const handleRequestDelete = useCallback((song) => {
    setSongToDelete(song);
    setDeleteDialogOpen(true);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(false);
    setSongToDelete(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!songToDelete) return;

    try {
      await axiosInstance.delete(endpoints.songs.generic, {
        data: { songId: songToDelete.id },
      });
      showToast(t("MyMusic.Upload.DeleteSuccess"), "success");
      fetchSongsList();
    } catch (err) {
      showToast(err.message || t("MyMusic.Upload.DeleteError"), "error");
    } finally {
      handleCloseDeleteDialog();
    }
  }, [songToDelete, fetchSongsList, showToast, t, handleCloseDeleteDialog]);

  return (
    <StyledCard>
      <ListComponent
        songs={songs}
        loading={loading}
        onOpen={handleOpenDialog}
        onDelete={handleRequestDelete}
      />

      <Toast toast={toast} handleClose={handleClose} />

      {editDialogOpen && (
        <EditDialog
          onClose={handleCloseDialog}
          open={editDialogOpen}
          propsSong={selectedSong}
          onRefetch={fetchSongsList}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "background.default",
          },
        }}
      >
        <DialogTitle>{t("Common.ConfirmDeleteTitle")}</DialogTitle>
        <DialogContent>
          <Typography>{t("Common.ConfirmDeleteMessage")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="contained"
            color="success"
          >
            {t("Common.Cancel")}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            autoFocus
            variant="contained"
          >
            {t("Common.Delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </StyledCard>
  );
};

export default ListContainer;
