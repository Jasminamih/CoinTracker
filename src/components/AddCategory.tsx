import { Icon, TableCell, TableRow } from "@mui/material";
import * as React from "react";
import { Category } from "../interfaces/CategoryInterface";

interface Props {
  item: Category;
  handleEdit: (object: Category) => void;
}

const AddCategory = ({ item, handleEdit }: Props) => {
  return (
    <TableRow
      onClick={(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        handleEdit(item);
      }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell align="left">
        {" "}
        <Icon
          sx={{
            color: item.type === "expense" ? "red" : "green",
          }}
        >
          {item.icon}
        </Icon>
      </TableCell>
      <TableCell sx={{ color: item.type === "expense" ? "red" : "green" }}>
        {item.name}
      </TableCell>
      <TableCell
        sx={{
          color: item.type === "expense" ? "red" : "green",
          textAlign: "right",
        }}
      >
        {item.isEnabled ? "no budget limit" : item.budget}
      </TableCell>
    </TableRow>
  );
};
export default AddCategory;
