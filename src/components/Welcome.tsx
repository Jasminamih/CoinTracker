import { Box, Container, Typography } from "@mui/material";
import React from "react";
import logo from "../../src/Logo.png";
import LogoCompact from "../../src/LogoCompact.svg";

interface Props {
  text: String;
}

const Welcome = ({ text }: Props) => {
  return (
    <div>
      <img className="logo" src={LogoCompact} />
      <Typography component="h1" variant="h5">
        WELCOME
      </Typography>
      <p>{text}</p>
    </div>
  );
};

export default Welcome;
