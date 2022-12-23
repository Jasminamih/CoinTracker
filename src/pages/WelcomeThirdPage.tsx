import {
  Box,
  Button,
  Container,
  Icon,
  Link,
  Table,
  TableContainer,
  TextField,
} from "@mui/material";
import { TableBody, TableCell, TableRow } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "..//context/CategoryContext";
import Wellcome from "../components/Welcome";

const WelcomeThirdPage = () => {
  const { enabled, setEnabled } = useContext(CategoryContext);
  const { category, setCategory } = useContext(CategoryContext);

  const addNew = (e: any) => {
    setEnabled([...enabled]);
    setCategory([...category]);
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Wellcome
            text={
              "Set how much money you want to spend on each Category monthly"
            }
          />

          <TableContainer>
            <Table aria-label="simple table">
              <TableBody>
                {category.map((item) => {
                  return !item.isEnabled ? (
                    <>
                      <TableRow
                        key={item?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          {" "}
                          <Icon sx={{ color: "black" }}>{item?.icon}</Icon>
                        </TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          {item?.name}
                          <TextField
                            key={item?.id}
                            sx={{textAlign: "right",
                         

                              "& fieldset": { border: "none" },
                            }}
                            name={item?.name}
                            type="text"
                            onChange={(event) => {
                              item.budget = 0 || +event.target.value;
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  ) : null;
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            component={Link}
            href="/overview"
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              textDecoration: "none",
              backgroundColor: "#6200EE",
              "&:disabled": { backgroundColor: "white", color: "gray" },
            }}
            onClick={addNew}
          >
            Complete
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default WelcomeThirdPage;
