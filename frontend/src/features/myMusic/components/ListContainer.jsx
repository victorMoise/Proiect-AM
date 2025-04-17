import React, { useCallback, useEffect, useState } from "react";
import { StyledCard } from "../../../common/styles";
import ListComponent from "./ListComponent";
import useToast from "../../../hooks/useToast";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../utils/axios";
import { endpoints } from "../../../utils/endpoints";
import Toast from "../../../common/components/Toast";
import EditDialog from "./EditDialog";

const ListContainer = () => {
  const { t } = useTranslation("common");
  const { toast, showToast, handleClose } = useToast();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

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
  }, [fetchSongsList, showToast, t]);

  const handleOpenDialog = useCallback((song) => {
    setEditDialogOpen(true);
    setSelectedSong(song);
  }, []);
  const handleCloseDialog = useCallback(() => setEditDialogOpen(false), []);

  return (
    <StyledCard>
      <ListComponent
        songs={songs}
        loading={loading}
        onOpen={handleOpenDialog}
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
    </StyledCard>
  );
};

export default ListContainer;
