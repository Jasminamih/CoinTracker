import {
  Dialog,
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Dayjs } from "dayjs";
import React, { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { EntriesContext } from "../context/EntriesContext";
import MyDialog from "./Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Entries as Entry } from "../interfaces/EntriesInterface";

import {
  Autocomplete,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Props {
  item: any;
  onDelete: (object: Entry, event: any) => void;
  onDuplicate: (object: Entry, event: any) => void;
  onCreateNew: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  handleEdit: (object: Entry) => void;
}
export const Entries = ({
  onDuplicate,
  onCreateNew,
  handleEdit,
  item,
  onDelete,
}: Props) => {
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const ContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleCloseMenu = () => {
    setContextMenu(null);
  };

  return (
    <>
      <ListItem
        key={item.id}
        disablePadding
        onClick={() => {
          handleEdit(item);
        }}
        onContextMenu={ContextMenu}
      >
        <Menu
          open={contextMenu !== null}
          onClose={handleCloseMenu}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={onCreateNew}>Create new</MenuItem>
          <MenuItem onClick={(event) => onDuplicate(item, event)}>
            Duplicate
          </MenuItem>
          <MenuItem onClick={(event) => onDelete(item, event)}>Delete</MenuItem>
        </Menu>
        <ListItemButton component="div" dense>
          <ListItemIcon>
            <Icon style={{ color: "black" }}>{item.icon}</Icon>
          </ListItemIcon>
          <Typography sx={{ width: "100%", textAlign: "left" }}>
            <ListItemText primary={item.name} />

            <Typography sx={{ fontSize: 10 }}>
              {new Date(item.date).toLocaleDateString("en-US")}
            </Typography>
          </Typography>
          <Typography color={item.type === "income" ? "green" : "red"}>
            {item.type === "income" ? "+" : "-"}
            {item.amount}
          </Typography>
        </ListItemButton>
      </ListItem>
    </>
  );
};
