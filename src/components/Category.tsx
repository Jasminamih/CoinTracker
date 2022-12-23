import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  Checkbox,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { CategoryContext } from "../context/CategoryContext";
import { Category } from "../interfaces/CategoryInterface";

const Categories = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const { enabled, setEnabled } = useContext(CategoryContext);

  const handleFavoriteClick = (product: Category) => {
    setCategory((prevState: any) => {
      return prevState.map((card: any) => {
        if (card.id === product.id) {
          return {
            ...card,
            isEnabled: !card.isEnabled,
          };
        } else {
          return card;
        }
      });
    });

    const selectedImage = enabled.find((img) => img.id === product.id);

    if (selectedImage) {
      setEnabled((prevState: any) =>
        prevState.filter((item: any) => item.id !== product.id)
      );
    } else {
      const img = category.find((card) => card.id === product.id);
      setEnabled([...enabled, { ...img!, isEnabled: false }]);
    }
  };

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableBody>
          {category.map((item) => {
            return (
              <>
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    {" "}
                    <Icon sx={{ color: "black" }}>{item.icon}</Icon>
                  </TableCell>
                  <TableCell
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {item.name}
                    <Checkbox
                      defaultChecked={item.isEnabled ? false : true}
                      onClick={() => handleFavoriteClick(item)}
                      inputProps={{ "aria-label": "controlled" }}
                    />{" "}
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Categories;
