import React from "react";

import StaticHeader from "./type/staticHeader";
import ElevateHeader from "./type/elevateHeader";
import FixedHeader from "./type/fixedHeader";
import HideHeader from "./type/hideHeader";

export default function Header() {
  return (
    <header>
      {process.env.GATSBY_HEADER_TYPE === "STATIC" ? (
        <StaticHeader />
      ) : process.env.GATSBY_HEADER_TYPE === "FIXED" ? (
        <FixedHeader />
      ) : process.env.GATSBY_HEADER_TYPE === "HIDE" ? (
        <HideHeader />
      ) : process.env.GATSBY_HEADER_TYPE === "ELEVATE" ? (
        <ElevateHeader />
      ) : (
        <></>
      )}
    </header>
  );
}
