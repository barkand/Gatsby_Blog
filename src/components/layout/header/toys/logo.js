import React from "react";
import { Link } from "gatsby";

import logo from "../../../../static/images/logo.png";

export default function Logo() {
  return (
    <>
      <Link to={"/"}>
        <img
          alt="Logo"
          src={logo}
          style={{ width: "30px", marginRight: "20px" }}
        />
      </Link>
    </>
  );
}
