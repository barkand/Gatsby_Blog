import React from "react";
import { Typography } from "@mui/material";

export default function Title() {
  return (
    <>
      <Typography variant="subtitle1" component="div">
        {process.env.GATSBY_COMPANY_NAME}
      </Typography>
    </>
  );
}
