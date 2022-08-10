import React from "react";
import { Grid } from "@mui/material";

export default function CustomItem({ children }) {
  return (
    <Grid item sm={11} md={6}>
      {children}
    </Grid>
  );
}
