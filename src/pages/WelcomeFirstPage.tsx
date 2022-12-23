import { Box, Button, Container, Link, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Welcome from "../components/Welcome";

const WelcomeFirstPage = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    let isDisabled = true;

    if (amount > 0) {
      isDisabled = false;
    }

    setIsDisabled(isDisabled);
  }, [amount]);

  return (
    <div>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ position: "relative", height: "100vh" }}
      >
        <Box
          sx={{
            paddingTop: 7,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Welcome text={"How much money you have at the moment?"} />

          <TextField
            id="filled-basic"
            label="Amount"
            variant="filled"
            fullWidth
            value={amount}
            onChange={(event) => setAmount(+event?.target.value)}
          />

          <Button
            component={Link}
            href="/welcome-2"
            variant="contained"
            type="submit"
            sx={{
              mt: 3,
              position: "absolute",
              bottom: "20px",
              width: "90%",
              textDecoration: "none",
              backgroundColor: "#6200EE",
              "&:disabled": { backgroundColor: "white", color: "gray" },
            }}
            disabled={isDisabled}
          >
            Add{" "}
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default WelcomeFirstPage;
