import React from "react";
import { AppBar, Toolbar } from "@mui/material";

import Logo from "../toys/logo";
import Title from "../toys/title";
import Gap from "../toys/gap";
import DarkModeBtn from "../../../theme/darkModeBtn";

export default function AppBarComponent(props) {
  return (
    <AppBar
      elevation={props.elevation}
      position={props.position}
      sx={{
        textAlign: "center",
        height: "50px",
        backgroundColor: props.elevation === 0 ? "transparent" : "default",
      }}
      enableColorOnDark
    >
      <Toolbar variant="dense">
        <Logo />
        <Title />
        <Gap />
        <DarkModeBtn />
      </Toolbar>
    </AppBar>
  );
}
