import React from "react";
import { Outlet } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import theme from "../../theme";
import Header from "../Navbar/Header";

export default function Layout() {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <Outlet />
    </MantineProvider>
  );
}
