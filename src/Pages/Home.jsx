import "@mantine/core/styles.css";
import { MantineProvider, Text, Box, Button } from "@mantine/core";
import theme from "../theme"; // Adjust the path as necessary
import React, { useState, useEffect } from "react";
import Header from "../components/Navbar/Header";
import Hero from "../components/Hero/Hero";
import classes from "./Home.module.css";
//import PopularProd from "./components/PopularProd/PopularProd";
import { fetchPopularProducts } from "../shopify";
import PopularProd from "../components/PopularProd";
import Featured from "../components/Featured";
import Bundle from "../components/Bundle";

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetchPopularProducts().then(setPopularProducts).catch(console.error);
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Header />
      <Box
        className={classes.app}
        style={{ display: "flex", flexDirection: "column", gap: "60px" }}
      >
        <Hero /> <PopularProd products={popularProducts} />
        <Featured />
        <Bundle />
      </Box>
    </MantineProvider>
  );
};

export default Home;
