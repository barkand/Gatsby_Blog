import React from "react";

import logo from "../../../../images/logo.png";

export default function Logo() {
  return (
    <>
      <img
        alt="Logo"
        src={logo}
        style={{ width: "30px", marginRight: "20px" }}
      />
    </>
  );
}
