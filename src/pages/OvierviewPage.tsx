import React, { useContext, useEffect, useState } from "react";
import HeaderPage from "../components/Header";
import Menu from "../components/Menu";
import {
  Container,
  Dialog,
  DialogTitle,
  List,
  MenuItem,
  Paper,
  styled,
} from "@mui/material";
import { CategoryContext } from "../context/CategoryContext";
import { EntriesContext } from "../context/EntriesContext";
import { Entries } from "../components/Entries";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Entries as Entry } from "../interfaces/EntriesInterface";

import {
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import IncomeAndExpense from "../components/IncomeAndExpense";

const Ovierview = () => {
  const { enabled, setEnabled } = useContext(CategoryContext);
  const { category, setCategory } = useContext(CategoryContext);
  const { entries, setEntries } = useContext(EntriesContext);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState<string>("");

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [newEntry, setNewEntry] = useState<Entry>({
    amount: 0,
    name: "",
    description: "",
    id: new Date(),
    icon: "",
    type: "income" || "expense",
    date: new Date().toString() || null,
  });

  const [opened, setOpened] = React.useState(false);

  const handleClose = () => {
    setOpened(false);
  };

  const onCreateNew = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    setNewEntry({
      amount: 0,
      name: "",
      description: "",
      id: new Date(),
      icon: "",
      type: title === "Add new Income" ? "income" : "expense",
      date: new Date().toString() || null,
    });
    setTitle("Add new entry");
    console.log(newEntry);
    console.log(title);
    setOpened(true);
  };

  const handleEdit = (object: Entry) => {
    setTitle("Update Entry");
    setNewEntry(object);
    console.log(newEntry);

    setOpened(true);

    const obj = entries.map((item) => {
      if (item.id === object.id) {
        return object;
      } else {
        return item;
      }
    });
    setEntries(obj);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === "Update Entry") {
      const newList = entries.map((todo) => {
        if (todo.id === newEntry.id) {
          return {
            id: todo.id,
            name: newEntry.name,
            amount: newEntry.amount,
            date: newEntry.date,
            description: newEntry.description,
            icon: todo.icon,
            type: todo.type,
          };
        }
        return todo;
      });
      setEntries(newList);
    } else if (title === "Duplicate Entry") {
      setEntries([
        ...entries,
        {
          ...newEntry,
          id: new Date(),
        },
      ]);
    } else {
      setEntries([...entries, newEntry]);
      setNewEntry({
        amount: 0,
        name: "",
        description: "",
        id: new Date(),
        icon: "",
        type: "income" || "expense",
        date: new Date().toString() || null,
      });
    }
    setOpened(false);
  };

  useEffect(() => {
    let isDisabled = true;

    if (newEntry.amount !== 0 && newEntry.name !== "none") {
      isDisabled = false;
    }

    setIsDisabled(isDisabled);
  }, [newEntry]);

  // const income = enabled
  //   .filter((person) => person.type === "income")
  //   .map((filteredName) => filteredName.name);
  // const expense = enabled
  //   .filter((person) => person.type === "expense")
  //   .map((filteredName) => filteredName.name);

  const onDuplicate = (object: Entry, event: any) => {
    event.stopPropagation();

    setTitle("Duplicate Entry");
    setNewEntry(object);
    setOpened(true);
  };

  const onDelete = (item: any, event: any) => {
    event.stopPropagation();

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (isConfirmed) {
      const filteredEntries = entries.filter((e) => e.id !== item.id);
      setEntries(filteredEntries);
      console.log(item);
    }
  };

  const CardWrapper = styled("div")(
    () => `
 border-radius: 5px;
    box-shadow: 0px 8px 18px 0px rgba(0,0,0,0.75);
    margin-top:40px
    `
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgba(169, 169, 169, 0.3)",
    padding: "15px 10px",
    textAlign: "left",
    color: "gray",
    opacity: 0.8,
    fontSize: "20px",
  }));

  return (
    <div>
      <HeaderPage title={"Overview"} />
      <Container
        component="main"
        sx={{ position: "relative", paddingBottom: "100px" }}
      >
        <CardWrapper>
          <Item>Income</Item>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {category.map((item) => {
              return !item.isEnabled && item.type === "income" ? (
                <IncomeAndExpense {...item} />
              ) : (
                ""
              );
            })}
          </List>
        </CardWrapper>
        <CardWrapper>
          <Item>Expense</Item>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {category.map((item) => {
              return !item.isEnabled && item.type === "expense" ? (
                <IncomeAndExpense {...item} />
              ) : (
                ""
              );
            })}
          </List>
        </CardWrapper>
        <CardWrapper>
          <Item>Entries</Item>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {entries.map((item) => {
              return (
                <Entries
                  item={item}
                  onDelete={onDelete}
                  onDuplicate={onDuplicate}
                  onCreateNew={onCreateNew}
                  handleEdit={handleEdit}
                />
              );

              {
                /* <LinearProgress variant="determinate" color="secondary" /> */
              }
            })}
          </List>
        </CardWrapper>

        <Dialog open={opened} onClose={handleClose}>
          <DialogTitle>{title}</DialogTitle>

          <form onSubmit={onSubmit}>
            <DialogContent>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">Type</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select-label"
                  value={newEntry.type}
                  placeholder="Type"
                  label="Type"
                  onChange={(
                    event: SelectChangeEvent<"income" | "expense">
                  ) => {
                    setNewEntry({
                      ...newEntry,
                      type: event.target.value as "income" | "expense",
                    });
                  }}
                >
                  <MenuItem value={"income"}>Income</MenuItem>
                  <MenuItem value={"expense"}> Expense</MenuItem>
                </Select>
              </FormControl>

              <FormControl margin="normal" fullWidth>
                {/* <Autocomplete
                  disablePortal
                  id="name"
                  options={newEntry.type === "income" ? income : expense}
                  sx={{ width: 315 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                /> */}

                <InputLabel id="name">Name</InputLabel>

                <Select
                  labelId="name"
                  id="name"
                  placeholder="name"
                  label="name"
                  value={newEntry.name}
                  onChange={(event: SelectChangeEvent<string>) => {
                    setNewEntry({
                      ...newEntry,
                      name: event.target.value,
                    });
                  }}
                >
                  {enabled.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <TextField
                autoFocus
                margin="normal"
                id="Amount"
                label="Amount"
                type="number"
                fullWidth
                variant="outlined"
                value={newEntry.amount}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => {
                  setNewEntry({ ...newEntry, amount: +event.target.value });
                }}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  disableFuture
                  label="Date"
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={newEntry.date}
                  onChange={(newValue) => {
                    setNewEntry({ ...newEntry, date: newValue });
                  }}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        width: "100%",
                        marginTop: "16px",
                        marginBottom: "8px",
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                autoFocus
                margin="normal"
                id="Description"
                label="Description"
                type="text"
                fullWidth
                variant="outlined"
                value={newEntry.description}
                onChange={(
                  event: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >
                ) => {
                  setNewEntry({
                    ...newEntry,
                    description: event?.target.value,
                  });
                }}
              />
            </DialogContent>
            <DialogActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" disabled={isDisabled}>
                Add
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* <Dialog open={open} onClose={handleClose}>

          <MyDialog handleClose={handleClose} titles={"Update Entry"} />
        </Dialog> */}
      </Container>
      <Menu />
    </div>
  );
};

export default Ovierview;
