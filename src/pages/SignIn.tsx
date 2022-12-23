import React, { useContext, useEffect, useState } from "react";
import logo from "../../src/Logo.png";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn = () => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    email: "",
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    let isDisabled = true;

    if (values.password !== "" && values.email !== "") {
      isDisabled = false;
    }

    setIsDisabled(isDisabled);
  }, [values]);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img className="logoMain" src={logo} />
            <p className="logo-text">
              Coin<span>Tracker</span>
            </p>
          </div>

          <Typography component="h1" variant="h5" sx={{ letterSpacing: 3 }}>
            {" "}
            {"SIGN IN"}
          </Typography>

          <Box component="form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              placeholder="Input text"
              onChange={onChange}
              value={values.email}
              autoComplete="email"
              autoFocus
              type="email"
              name="email"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              onChange={onChange}
              value={values.password}
              id="password"
              autoComplete="current-password"
              placeholder="Input text"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              component={Link}
              to={"/overview"}
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                mb: 2,
                textDecoration: "none",
                backgroundColor: "#6200EE",
                "&:disabled": { backgroundColor: "white", color: "gray" },
              }}
              disabled={isDisabled}
            >
              {"SIGN IN"}
            </Button>
          </Box>

          <p>{"Don't have account yet?"}</p>
          <Link to={"/signup"}>{"Sign up now, it is free."}</Link>
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
