import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { BarChart, Category, Home } from "@mui/icons-material";
import { Button, Icon, Modal, Tab, Tabs } from "@mui/material";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewEntry from "./AddExpense";
import AddIncome from "./AddIncome";
import AddExpense from "./AddExpense";


const Menu = () => {
  const [selected, setSelected] = React.useState(0);

  const [value, setValue] = React.useState(0);

  const style = {
    position: "absolute" as "absolute",
    bottom: "70px",
    right: "40px",
    width: 150,
    pt: 2,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#6200EE",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <div>
        <Fab
          type="button"
          onClick={handleOpen}
          color="primary"
          aria-label="add"
          sx={{
            position: "absolute",
            bottom: (theme) => theme.spacing(3),
            right: (theme) => theme.spacing(2),
          }}
        >
          <AddIcon />
        </Fab>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 150 }}>
            <AddIncome />
            <AddExpense />
          </Box>
        </Modal>
      </div>

      <BottomNavigation
        sx={{
          backgroundColor: "#6200EE",
          width: "80%",
          justifyContent: "flex-start",
        }}
        showLabels
        value={selected}
        onChange={(value, newValue) => {
          setSelected(newValue);
        }}
      >
        <BottomNavigationAction
          component={RouterLink}
          to="/overview"
          color="primary"
          label="Overview"
          icon={<Home />}
          sx={{ color: "white" }}
        />
        <BottomNavigationAction
          label="Categories"
          component={RouterLink}
          to="/categories"
          icon={<Category />}
          sx={{ color: "white" }}
        />

        <BottomNavigationAction
          label="Statistics"
          component={RouterLink}
          to="/statistics"
          icon={<BarChart />}
          sx={{ color: "white" }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Menu;
