import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../src/Logo.png";
import {Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
    email: "",
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { onLogin } = useContext(UserContext);



  let regex = /(?=.*?[#?!@$%^&*-])/;

  useEffect(() => {
    if (values.password) {
      if (values.password.match(regex)) {
        if (values.password.length < 8) {
          setErrorPass("Password must be at least 8 characters");
        } else if (values.password.length > 32) {
          setErrorPass("Password must be less than 32 characters");
        } else {
          setErrorPass("");
        }
      } else {
        setErrorPass(
          "Password must contain at least one of this characters (!@#$%^&*)"
        );
      }
    }
  }, [values.password]);

  let regexMail = /\S+@\S+\.\S+/;
  useEffect(() => {
    if (values.email) {
      if (values.email.match(regexMail)) {
        setErrorEmail("");
      } else {
        setErrorEmail("Please enter a valid mail adrress");
      }
    }
  }, [values.email]);

  useEffect(() => {
    let isDisabled = true;

    if (
      values.password.match(regex) &&
      values.password.length > 8 &&
      values.password.length < 32
    ) {
      isDisabled = false;
    }

    setIsDisabled(isDisabled);
  }, [values.password]);

  useEffect(() => {
    let isDisabled;

    if (values.email.match(regexMail) && values.email !== "") {
      isDisabled = false;
    }

  }, [values.email]);

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
            {"SIGN UP"}
          </Typography>

          <Box component="form" onSubmit={() => onLogin}>
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
              error={Boolean(errorEmail.length)}
              helperText={errorEmail}
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
              error={Boolean(errorPass.length)}
              helperText={errorPass}
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
              onClick={onLogin}
              component={Link}
              to={"/welcome-1"}
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
              {"SIGN UP"}
            </Button>
          </Box>

          <p>{"Already have account?"}</p>
          <Link to={"/"}>{"Sign in please."}</Link>
        </Box>
      </Container>
    </div>
  );
};

export default SignUp;
