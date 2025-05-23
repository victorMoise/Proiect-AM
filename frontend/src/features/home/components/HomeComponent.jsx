import React, { useMemo } from "react";
import FakeText from "../../../common/components/FakeText";
import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Checkbox, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

const paginationModel = { page: 0, pageSize: 10 };
const pageSizeOptions = [5, 10, 20, 50];

const HomeComponent = (props) => {
  const { t } = useTranslation("common");
  const {
    songs,
    loading,
    playingSongId,
    onPlayPause,
    onFavoriteSong,
    onUnfavoriteSong,
    onAddToQueue,
    isFavorite,
    onIsFavoriteChange,
    ownedSongs,
    onOwnedSongsChange,
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = useMemo(
    () => [
      {
        field: "title",
        headerName: t("Home.Songs.Title"),
        flex: 1,
        minWidth: 150,
        headerClassName: "custom-header",
      },
      {
        field: "artist",
        headerName: t("Home.Songs.Artist"),
        flex: 1,
        minWidth: 150,
        headerClassName: "custom-header",
      },
      {
        field: "genre",
        headerName: t("Home.Songs.Genre"),
        flex: 1,
        minWidth: 150,
        headerClassName: "custom-header",
      },
      {
        field: "duration",
        headerName: t("Home.Songs.Duration"),
        flex: 1,
        minWidth: 150,
        headerClassName: "custom-header",
      },
      {
        field: "actions",
        headerName: t("Common.Actions"),
        width: isMobile ? 0 : 200,
        headerClassName: "custom-header hideRightSeparator",
        headerAlign: "right",
        align: "right",
        sortable: false,
        filterable: false,
        renderCell: (params) => {
          const isPlaying = playingSongId === params.row.id;
          const isFavorite = params.row.isFavorite;

          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Tooltip
                title={
                  isFavorite
                    ? t("Home.Songs.RemoveFavorite")
                    : t("Home.Songs.AddFavorite")
                }
              >
                <IconButton
                  color={isFavorite ? "error" : "default"}
                  onClick={
                    !isFavorite
                      ? onFavoriteSong.bind(null, params.row)
                      : onUnfavoriteSong.bind(null, params.row)
                  }
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title={t("Home.Songs.PlayNow")}>
                <IconButton
                  color="primary"
                  onClick={onPlayPause.bind(null, params.row)}
                >
                  {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
              </Tooltip>
              <Tooltip title={t("Home.Songs.AddToQueue")}>
                <IconButton
                  color="primary"
                  onClick={onAddToQueue.bind(null, params.row)}
                >
                  <QueueMusicIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    [
      t,
      isMobile,
      playingSongId,
      onFavoriteSong,
      onUnfavoriteSong,
      onPlayPause,
      onAddToQueue,
    ]
  );

  if (loading) return <FakeText lines={10} />;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1">
              {t("Home.Songs.ShowFavoritesOnly")}
            </Typography>
            <Checkbox
              checked={isFavorite}
              onChange={onIsFavoriteChange}
              label={t("Home.Songs.Favorites")}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle1">
              {t("Home.Songs.ShowOwnedOnly")}
            </Typography>
            <Checkbox
              checked={ownedSongs}
              onChange={onOwnedSongsChange}
              label={t("Home.Songs.ShowOwnedSongs")}
            />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            rows={songs}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={pageSizeOptions}
            disableRowSelectionOnClick
            sx={{
              width: "100%",
              overflowX: "auto",
              "& .custom-header": {
                backgroundColor: theme.palette.primary.dark,
                color: "white",
              },
              "& .custom-header svg": {
                color: "white",
              },
              "& .hideRightSeparator > .MuiDataGrid-columnSeparator": {
                display: "none",
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default HomeComponent;
