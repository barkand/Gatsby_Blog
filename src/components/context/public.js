import React from "react";

import { DefaultPublic } from "./default";
import { SetColor, SetBackColor, SetTextColor } from "../theme/setColor";

export const PublicContext = React.createContext({
  publicCtx: "",
  setPublicCtx: () => {},
});

export const PublicProvider = ({ children }) => {
  let Default = FillDefaulePublic();
  const [publicCtx, setPublicCtx] = React.useState(Default);
  const value = React.useMemo(() => ({ publicCtx, setPublicCtx }), [publicCtx]);

  return (
    <PublicContext.Provider value={value}>{children}</PublicContext.Provider>
  );
};

const FillDefaulePublic = () => {
  let Default = { ...DefaultPublic };

  Default.device = typeof window !== "undefined" ? "web" : "mobile";

  let localMode;
  if (typeof window !== "undefined") localMode = localStorage.getItem("theme");
  localMode = localMode || process.env.GATSBY_THEM_MODE;

  Default.theme = {
    mode: localMode,
    color: process.env.GATSBY_THEM_COLOR,
    primary: {
      main: SetColor(localMode, process.env.GATSBY_THEM_COLOR, "Primary"),
    },
    secondary: {
      main: SetColor(localMode, process.env.GATSBY_THEM_COLOR, "Secondary"),
    },
    background: {
      default: SetBackColor(localMode),
    },
    text: {
      primary: SetTextColor(localMode),
    },
  };

  return Default;
};
