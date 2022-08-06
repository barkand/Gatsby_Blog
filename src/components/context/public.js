import React from "react";

import { DefaultPublic } from "./default";
import { SetColor, SetBackColor } from "../theme/setColor";

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

  Default.theme = {
    mode: process.env.REACT_APP_THEM_MODE,
    color: process.env.REACT_APP_THEM_COLOR,
    primary: {
      main: SetColor(
        process.env.REACT_APP_THEM_MODE,
        process.env.REACT_APP_THEM_COLOR,
        "Primary"
      ),
    },
    secondary: {
      main: SetColor(
        process.env.REACT_APP_THEM_MODE,
        process.env.REACT_APP_THEM_COLOR,
        "Secondary"
      ),
    },
    background: {
      default: SetBackColor(process.env.REACT_APP_THEM_MODE),
    },
  };

  return Default;
};
