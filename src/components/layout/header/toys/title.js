import React from "react";
import { Typography } from "@mui/material";
import { Link } from "gatsby";

export default function Title() {
  return (
    <>
      <Link to={"/"}>
        <Typography variant="subtitle1" component="div">
          {process.env.GATSBY_COMPANY_NAME}
        </Typography>
      </Link>
    </>
  );
}
