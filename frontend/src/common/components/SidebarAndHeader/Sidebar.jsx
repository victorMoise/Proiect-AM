import React from 'react';
import { buttonBackground, sidebarBackground, sidebarColor, textColor } from '../../../constants/colors';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { map } from 'ramda';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Sidebar = (props) => {
  const { isMobile, isOpen, toggleSidebar, theme, menuItems } = props;

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={isOpen}
      onClose={toggleSidebar}
      sx={{
        width: isOpen ? (isMobile ? "240px" : 240) : 60,
        flexShrink: 0,
        transition: "width 0.3s ease",
        overflowX: "hidden",
        "& .MuiDrawer-paper": {
          width: isOpen ? (isMobile ? "240px" : 240) : 60,
          boxSizing: "border-box",
          backgroundColor: sidebarBackground,
          color: sidebarColor,
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          transition: "width 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Divider />
        <List sx={{ paddingTop: "62px" }}>
          {map(
            (item, index) => (
              <ListItem
                button
                key={index}
                onClick={item.onClick}
                sx={{
                  justifyContent: isOpen ? "flex-start" : "center",
                  color: textColor,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  cursor: "pointer",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isOpen ? "40px" : "0",
                    justifyContent: isOpen ? "flex-start" : "center",
                    color: textColor,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isOpen && <ListItemText primary={item.label} />}
              </ListItem>
            ),
            menuItems
          )}
        </List>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          padding: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {!isMobile && (
          <IconButton
            onClick={toggleSidebar}
            sx={{
              backgroundColor: buttonBackground,
              borderRadius: "50%",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              margin: isOpen ? "0 auto" : "0",
            }}
          >
            {isOpen ? (
              <ArrowBackIcon color={textColor} />
            ) : (
              <ArrowForwardIcon color={textColor} />
            )}
          </IconButton>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;