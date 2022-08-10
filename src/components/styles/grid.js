import React from "react";
import { Grid } from "@mui/material";

export default function CustomGrid({ children }) {
  return (
    <center>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Grid>
    </center>
  );
}
