import React from "react";
import { IconButton } from "@mui/material";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from "@mui/icons-material";

import { PublicContext } from "../context/public";
import { SetColor, SetBackColor } from "./setColor";

export default function DarkModeBtn() {
  const { publicCtx, setPublicCtx } = React.useContext(PublicContext);

  const toggleTheme = () => {
    let newMode = publicCtx.theme.mode === "DARK" ? "LIGHT" : "DARK";
    setPublicCtx({
      ...publicCtx,
      theme: {
        ...publicCtx.theme,
        mode: newMode,
        primary: {
          ...publicCtx.theme.primary,
          main: SetColor(newMode, publicCtx.theme.color, "Primary"),
        },
        secondary: {
          ...publicCtx.theme.secondary,
          main: SetColor(newMode, publicCtx.theme.color, "Secondary"),
        },
        background: {
          default: SetBackColor(newMode),
        },
      },
    });

    if (typeof window !== "undefined") localStorage.setItem("theme", newMode);
  };

  return (
    <IconButton
      sx={{ marginLeft: "5px" }}
      onClick={toggleTheme}
      color="inherit"
    >
      {publicCtx.theme.mode === "DARK" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}
