import { Box, Button, Container, Link } from "@mui/material";
import React from "react";
import Categories from "../components/Category";
import Wellcome from "../components/Welcome";

const WelcomeSecondPage = () => {
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
          <Wellcome text={"Choose Categories"} />
          <Categories />

          <Button
            component={Link}
            href="/welcome-3"
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
          >
            Done
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default WelcomeSecondPage;
