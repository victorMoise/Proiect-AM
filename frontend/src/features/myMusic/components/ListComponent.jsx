import { useTheme } from "@emotion/react";
import { Box, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import FakeText from "../../../common/components/FakeText";
import DeleteIcon from "@mui/icons-material/Delete";

const paginationModel = { page: 0, pageSize: 10 };
const pageSizeOptions = [5, 10, 20, 50];

const ListComponent = (props) => {
  const { songs, loading, onOpen, onDelete } = props;
  const { t } = useTranslation("common");
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
              <Tooltip title={t("Common.Edit")}>
                <IconButton onClick={onOpen.bind(null, params.row)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("Common.Delete")}>
                <IconButton color="error" onClick={onDelete.bind(null, params.row)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    ],
    [t, isMobile, onOpen, onDelete]
  );

  if (loading) return <FakeText lines={10} />;
  return (
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
  );
};

export default ListComponent;
