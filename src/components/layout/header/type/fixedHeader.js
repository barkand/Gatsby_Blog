import React from "react";
import AppBarComponent from "./appBar";

export default function FixedHeader() {
  return (
    <>
      <AppBarComponent position="fixed" />
      <div style={{ marginTop: "50px" }} />
    </>
  );
}
