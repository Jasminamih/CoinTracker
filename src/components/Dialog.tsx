import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  useAutocomplete,
} from "@mui/material";
import { CategoryContext } from "../context/CategoryContext";
import { Fragment, useContext, useEffect, useState } from "react";
import { EntriesContext } from "../context/EntriesContext";
import { Entries } from "../interfaces/EntriesInterface";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Props {
  handleClose: any;
  title: string;
}

const MyDialog = ({ handleClose, title }: Props) => {
  const { entries, setEntries } = useContext(EntriesContext);
  const { enabled, setEnabled } = useContext(CategoryContext);
  const [newEntry, setNewEntry] = useState<Entries>({
    amount: 0,
    name: "",
    description: "",
    id: new Date(),
    icon: "",
    type: title === "Add new Income" ? "income" : "expense",
    date: new Date().toString() || null,
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const StyledPopperDiv = styled("div")(
    () => `
     padding: 0.5rem;
     opacity: 1;
     display: flex;
     flex-direction: column
    
   `
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEntries([...entries, newEntry]);
    setNewEntry({
      amount: 0,
      name: "",
      description: "",
      id: new Date(),
      icon: "",
      type: title === "Add new Income" ? "income" : "expense",
      date: new Date().toString() || null,
    });
  };

  useEffect(() => {
    let isDisabled = true;

    if (newEntry.amount !== 0 && newEntry.name !== "" && newEntry.date) {
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

  return (
    <>
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
              onChange={(event: SelectChangeEvent<"income" | "expense">) => {
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
                  {newEntry.type==="expense"? (enabled.map((item) => {
                    return item.type==="expense" ? 
                                              
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem> : null})) : (enabled.map((item) => {
                    return item.type==="income" ? 
                                              
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem> : null})
                    )
                  }
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
            value={newEntry.amount?.toString()}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setNewEntry({ ...newEntry, description: event?.target.value });
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button  onClick={handleClose} type="submit" disabled={isDisabled}>
            Add
          </Button>
        </DialogActions>
      </form>
    </>
  );
};

export default MyDialog;
