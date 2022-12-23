import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material";
import MyDialog from "./Dialog";

export default function AddExpense() {
  const [open, setOpen] = React.useState(false);

  const StyledPopperDiv = styled("div")(
    () => `
    padding: 0.5rem;
    opacity: 1;
    display: flex;
    flex-direction: column
    
  `
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StyledPopperDiv>
        <Button
          onClick={handleClickOpen}
          sx={{
            border: "1px solid #6200EE",
            backgroundColor: "#6200EE",
            color: "white",
          }}
        >
          ADD EXPENSE
        </Button>{" "}
      </StyledPopperDiv>
      <Dialog open={open} onClose={handleClose}>
        <MyDialog handleClose={handleClose} title={"Add new Expense"} />
      </Dialog>
    </div>
  );
}
