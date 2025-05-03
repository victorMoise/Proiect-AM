import React, { useCallback, useEffect, useRef, useState } from "react";
import Toast from "../../../common/components/Toast";
import useToast from "../../../hooks/useToast";
import { useTranslation } from "react-i18next";
import { StyledCard } from "../../../common/styles";
import UploadComponent from "./UploadComponent";
import { axiosInstance } from "../../../utils/axios";
import { endpoints } from "../../../utils/endpoints";

const UploadContainer = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const { toast, showToast, handleClose } = useToast();
  const { t } = useTranslation("common");
  const selectFileButtonRef = useRef(null);
  const [artists, setArtists] = useState([]);
  const [artist, setArtist] = useState(null);
  const [newArtist, setNewArtist] = useState(null);
  const [genre, setGenre] = useState(null);
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [allowConvert, setAllowConvert] = useState(false);
  const [title, setTitle] = useState("");

  const handleSelectFile = useCallback(() => {
    if (!selectFileButtonRef.current) return;
    selectFileButtonRef.current.click();
  }, [selectFileButtonRef]);

  const handleSetFile = useCallback((e) => {
    if (!e.target?.files?.length) return;
    setFile(e.target.files[0]);
  }, []);

  useEffect(() => {
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

    fetchArtists();
  }, [showToast, t]);

  const handleArtistChange = useCallback((_event, newValue) => {
    setNewArtist("");
    setArtist(newValue);
  }, []);

  const handleNewArtistChange = useCallback((e) => {
    const { value } = e.target;
    setArtist(null);
    setNewArtist(value);
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

    fetchGenres();
  }, [showToast, t]);

  const handleGenreChange = useCallback((_event, newValue) => {
    setNewGenre("");
    setGenre(newValue);
  }, []);

  const handleNewGenreChange = useCallback((e) => {
    const { value } = e.target;
    setGenre(null);
    setNewGenre(value);
  }, []);

  const handleSave = useCallback(async () => {
    if (!file) {
      showToast(t("MyMusic.Upload.NoFile"), "error");
      return;
    }

    if (!artist && !newArtist) {
      showToast(t("MyMusic.Upload.NoArtist"), "error");
      return;
    }

    if (!genre && !newGenre) {
      showToast(t("MyMusic.Upload.NoGenre"), "error");
      return;
    }

    if (!title) {
      showToast(t("MyMusic.Upload.NoTitle"), "error");
      return;
    }

    const formData = new FormData();
    formData.append("File", file);
    formData.append("GenreId", genre?.id?.toString() || "");
    formData.append("NewGenreName", newGenre || "");
    formData.append("ArtistId", artist?.id?.toString() || "");
    formData.append("NewArtistName", newArtist || "");
    formData.append("Title", title || "");
    formData.append("IsPublic", isPublic === "yes" ? "true" : "false");
    formData.append("AllowConvert", allowConvert === "yes" ? "true" : "false");

    try {
      await axiosInstance.post(endpoints.songs.generic, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFile(null);
      setArtist(null);
      setNewArtist("");
      setGenre(null);
      setNewGenre("");
      setTitle("");
      setIsPublic(false);
      setAllowConvert("yes");
      if (onUploadSuccess) onUploadSuccess();
      showToast(t("MyMusic.Upload.Success"), "success");
    } catch (error) {
      showToast(
        error?.response?.data?.message ||
          error?.message ||
          t("MyMusic.Upload.Error"),
        "error"
      );
    }
  }, [
    file,
    artist,
    newArtist,
    genre,
    newGenre,
    title,
    isPublic,
    allowConvert,
    showToast,
    t,
    onUploadSuccess,
  ]);

  const handleReset = useCallback(() => {
    setFile(null);
    setArtist(null);
    setNewArtist("");
    setGenre(null);
    setNewGenre("");
    setTitle("");
    setIsPublic(false);
  }, []);

  const handleIsPublicChange = useCallback((e) => {
    const checked = e.target.value;
    setIsPublic(checked);
  }, []);

  const handleAllowConvertChange = useCallback((e) => {
    const checked = e.target.value;
    setAllowConvert(checked);
  }, []);

  const handleTitleChange = useCallback((e) => {
    const { value } = e.target;
    setTitle(value);
  }, []);

  return (
    <StyledCard>
      <UploadComponent
        file={file}
        onSelectFile={handleSelectFile}
        onSetFile={handleSetFile}
        selectFileButtonRef={selectFileButtonRef}
        artist={artist}
        artists={artists}
        onArtistChange={handleArtistChange}
        newArtist={newArtist}
        onNewArtistChange={handleNewArtistChange}
        genre={genre}
        genres={genres}
        onGenreChange={handleGenreChange}
        newGenre={newGenre}
        onNewGenreChange={handleNewGenreChange}
        onSave={handleSave}
        onReset={handleReset}
        title={title}
        onTitleChange={handleTitleChange}
        isPublic={isPublic}
        onIsPublicChange={handleIsPublicChange}
        allowConvert={allowConvert}
        onAllowConvertChange={handleAllowConvertChange}
      />
      <Toast toast={toast} handleClose={handleClose} />
    </StyledCard>
  );
};

export default UploadContainer;
