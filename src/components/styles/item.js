import React from "react";
import { Grid } from "@mui/material";

export default function CustomItem({ children, columns = 2 }) {
  return (
    <Grid item sm={12} md={12 / columns}>
      {children}
    </Grid>
  );
}
