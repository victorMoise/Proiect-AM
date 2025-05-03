import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useTranslation } from "react-i18next";

const UploadComponent = (props) => {
  const {
    file,
    onSelectFile,
    onSetFile,
    selectFileButtonRef,
    artist,
    artists,
    onArtistChange,
    newArtist,
    onNewArtistChange,
    genre,
    genres,
    onGenreChange,
    newGenre,
    onNewGenreChange,
    onReset,
    onSave,
    title,
    onTitleChange,
    isPublic,
    onIsPublicChange,
    allowConvert,
    onAllowConvertChange,
  } = props;
  const { t } = useTranslation("common");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">{t("MyMusic.Upload.Title")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center">
          <input
            type="file"
            accept="audio/*"
            ref={selectFileButtonRef}
            style={{ display: "none" }}
            onChange={onSetFile}
          />

          <IconButton onClick={onSelectFile} sx={{ fontSize: "1rem" }}>
            <UploadFileIcon />
          </IconButton>
          <TextField
            value={file ? file.name : ""}
            size="small"
            variant="standard"
            sx={{ flexGrow: 1 }}
            InputProps={{
              sx: { fontSize: "1rem" },
            }}
          />
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography variant="body1" component="h2" marginBottom={1}>
              {t("MyMusic.Upload.SetTitle")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              size="small"
              variant="outlined"
              value={title}
              onChange={onTitleChange}
              placeholder={t("MyMusic.Upload.TitlePlaceholder")}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item container xs={12} md={6}>
          <Grid item xs={12}>
            <Typography variant="body1" component="h2" marginBottom={1}>
              {t("MyMusic.Upload.MakePublic")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                variant="body1"
                component="h2"
                sx={{ whiteSpace: "nowrap" }}
              >
                {t("MyMusic.Upload.IsPublic")}:
              </Typography>
              <Select
                fullWidth
                size="small"
                value={isPublic ? "yes" : "no"}
                onChange={onIsPublicChange}
                displayEmpty
              >
                <MenuItem value="yes">{t("Yes")}</MenuItem>
                <MenuItem value="no">{t("No")}</MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6}>
          <Grid item xs={12}>
            <Tooltip title={t("MyMusic.Upload.AllowConvertTooltip")}>
              <Typography variant="body1" component="h2" marginBottom={1}>
                {t("MyMusic.Upload.AllowConvertQuestion")}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                variant="body1"
                component="h2"
                sx={{ whiteSpace: "nowrap" }}
              >
                {t("MyMusic.Upload.AllowConvert")}:
              </Typography>
              <Select
                fullWidth
                size="small"
                value={allowConvert ? "yes" : "no"}
                onChange={onAllowConvertChange}
                displayEmpty
              >
                <MenuItem value="yes">{t("Yes")}</MenuItem>
                <MenuItem value="no">{t("No")}</MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid item xs={12}>
            <Typography variant="body1" component="h2" marginBottom={1}>
              {t("MyMusic.Upload.SelectExistingArtist")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={artists || []}
              value={artist}
              getOptionLabel={(option) => option.name}
              onChange={onArtistChange}
              renderInput={(params) => (
                <TextField {...params} label={t("Home.Songs.Artist")} />
              )}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6}>
          <Grid item xs={12}>
            <Typography variant="body1" component="h2" marginBottom={1}>
              {t("MyMusic.Upload.CreateNewArtist")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                variant="body1"
                component="h2"
                sx={{ whiteSpace: "nowrap" }}
              >
                {t("MyMusic.Upload.Artist")}:
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={newArtist}
                onChange={onNewArtistChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>

      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid item xs={12}>
            <Typography variant="body1" component="h2" marginBottom={1}>
              {t("MyMusic.Upload.SelectExistingGenre")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={genres || []}
              value={genre}
              getOptionLabel={(option) => option.name}
              onChange={onGenreChange}
              renderInput={(params) => (
                <TextField {...params} label={t("Home.Songs.Genre")} />
              )}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6}>
          <Grid item xs={12}>
            <Typography variant="body1" component="h2" marginBottom={1}>
              {t("MyMusic.Upload.CreateNewGenre")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                variant="body1"
                component="h2"
                sx={{ whiteSpace: "nowrap" }}
              >
                {t("MyMusic.Upload.Genre")}:
              </Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={newGenre}
                onChange={onNewGenreChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} container justifyContent="flex-end">
        <Button
          variant="contained"
          color="error"
          onClick={onReset}
          sx={{ mr: 1 }}
        >
          {t("MyAccount.Reset")}
        </Button>
        <Button variant="contained" color="success" onClick={onSave}>
          {t("MyAccount.Save")}
        </Button>
      </Grid>
    </Grid>
  );
};

export default UploadComponent;
