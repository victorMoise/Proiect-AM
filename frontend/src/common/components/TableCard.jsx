import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTranslation } from "react-i18next";

const TableCard = ({
  title,
  tableHeaders,
  cardActions,
  itemList,
  itemActions,
}) => {
  const [expanded, setExpanded] = useState(true);
  const { t } = useTranslation("common");

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ padding: 2, boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleToggleExpand} size="small">
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            {title && <Typography variant="h5">{title}</Typography>}
          </div>
          {cardActions && <div>{cardActions}</div>}
        </div>

        {expanded && (
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  {tableHeaders?.map((header, index) => (
                    <TableCell key={index}>
                      <Typography variant="body1" fontWeight="bold">
                        {header}
                      </Typography>
                    </TableCell>
                  ))}
                  {itemActions && (
                    <TableCell align="right">
                      <Typography variant="body1" fontWeight="bold">
                        {t("Common.Actions")}
                      </Typography>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {itemList?.map((item, index) => (
                  <TableRow key={index} hover>
                    {Object.values(item).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                    {itemActions && (
                      <TableCell align="right">
                        {itemActions(item).map((action, i) => (
                          <React.Fragment key={i}>{action}</React.Fragment>
                        ))}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

TableCard.propTypes = {
  title: PropTypes.string,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  cardActions: PropTypes.node,
  itemList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableCard;
