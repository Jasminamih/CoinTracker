import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Container

} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { CategoryContext } from "../context/CategoryContext";
import HeaderPage from "../components/Header";
import Menu from "../components/Menu";
import { Category } from "../interfaces/CategoryInterface";
import AddCategory from "../components/AddCategory";

const CategoriesPage = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState<string>("");
  const { enabled, setEnabled } = useContext(CategoryContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [newCategory, setNewCategory] = useState<Category>({
    budget: 0,
    name: "",
    isEnabled: true,
    expected: 0,
    id: new Date().valueOf(),
    icon: "",
    type: "income" || "expense",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (event: any) => {
    setTitle("Add new category");
    setOpen(true);

    setNewCategory({
      budget: 0,
      name: "",
      isEnabled: true,
      expected: 0,
      id: new Date().valueOf(),
      icon: "",
      type: "income" || "expense",
    });
  };

  const handleEdit = (object: Category) => {
    setTitle("Update category");
    setNewCategory(object);

    setOpen(true);

    const obj = category.map((item) => {
      if (item.id === object.id) {
        return object;
      } else {
        return item;
      }
    });
    setCategory(obj);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title === "Update category") {
      const newList = category.map((todo) => {
        if (todo.id === newCategory.id) {
          return {
            id: todo.id,
            name: newCategory.name,
            budget: newCategory.budget,
            isEnabled: newCategory.isEnabled,
            icon: todo.icon,
            type: todo.type,
          };
        }
        return todo;
      });
      setCategory(newList);
    } else {
      setCategory([...category, newCategory]);
      setEnabled([...enabled, newCategory]);
      setNewCategory({
        budget: 0,
        name: "",
        isEnabled: true,
        expected: 0,
        id: new Date().valueOf(),
        icon: "",
        type: "income" || "expense",
      });
    }
  };


  
  useEffect(() => {
    let isDisabled = true;

    if (newCategory.name !== "" ) {
      isDisabled = false;
    }

    setIsDisabled(isDisabled);
  }, [newCategory]);

  return (
    <div>
      <HeaderPage title={"Categories"} />
      <Container sx={{marginBottom: 10}}>

      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="left">
                <Icon sx={{ color: "black" }} onClick={handleClick}>
                  add
                </Icon>
              </TableCell>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <form onSubmit={onSubmit}>
                  <DialogContent>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select-label"
                        value={newCategory.type}
                        placeholder="Type"
                        label="Type"
                        onChange={(
                          event: SelectChangeEvent<"income" | "expense">
                        ) => {
                          setNewCategory({
                            ...newCategory,
                            type: event.target.value as "income" | "expense",
                          });
                        }}
                      >
                        <MenuItem value={"income"}>Income</MenuItem>
                        <MenuItem value={"expense"}> Expense</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      autoFocus
                      margin="normal"
                      id="name"
                      label="Name"
                      value={newCategory.name}
                      type="text"
                      fullWidth
                      variant="outlined"
                      onChange={(
                        event: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => {
                        setNewCategory({
                          ...newCategory,
                          name: event.target.value,
                        });
                      }}
                    />
                    <FormControl margin="normal" fullWidth>
                      <InputLabel id="icon">Icon</InputLabel>

                      <Select
                        labelId="icon"
                        id="icon"
                        placeholder="Icon"
                        label="Icon"
                        onChange={(event: SelectChangeEvent<string>) => {
                          setNewCategory({
                            ...newCategory,
                            icon: event.target.value,
                          });
                        }}
                        value={newCategory.icon}
                      >
                        {category.map((item) => {
                          return (
                            <MenuItem key={item.id} value={item.icon}>
                              <Icon sx={{ color: "black" }}>{item.icon}</Icon>{" "}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <TextField
                      autoFocus
                      margin="normal"
                      id="budget"
                      label="Budget"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={newCategory.budget?.toString()}
                      onChange={(
                        event: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => {
                        setNewCategory({
                          ...newCategory,
                          budget: +event?.target.value,
                        });
                      }}
                    />
                    <TextField
                      autoFocus
                      margin="normal"
                      id="name"
                      label="Enabled"
                      type="checkbox"
                      fullWidth
                      variant="outlined"
                      value={newCategory.isEnabled}
                      // defaultChecked={isEnabled ? false : true}

                      onChange={(
                        event: React.ChangeEvent<
                          HTMLInputElement | HTMLTextAreaElement
                        >
                      ) => {
                        setNewCategory({ ...newCategory, isEnabled: false });
                      }}
                    />
                  </DialogContent>
                  <DialogActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" onClick={handleClose} disabled={isDisabled}>Add</Button>
                  </DialogActions>
                </form>{" "}
              </Dialog>
              <TableCell> Add category</TableCell>
              <TableCell></TableCell>
            </TableRow>

            {category.map((item) => {
              return (
                <>
                  <AddCategory
                    key={item.id}
                    item={item}
                    handleEdit={handleEdit}
                  />
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>

      <Menu />
    </div>
  );
};

export default CategoriesPage;
