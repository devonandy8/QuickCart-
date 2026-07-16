import React, { useState, useEffect } from "react";
import { Box } from "@mantine/core";
import classes from "./Home.module.css";
import Hero from "../components/Hero/Hero";
import { fetchPopularProducts } from "../lib/products";
import PopularProd from "../components/PopularProd";
import Featured from "../components/Featured";
import Bundle from "../components/Bundle";

const Home = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPopularProducts()
      .then(setPopularProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box
      className={classes.app}
      style={{ display: "flex", flexDirection: "column", gap: "60px" }}
    >
      <Hero />
      <PopularProd products={popularProducts} loading={loading} error={error} />
      <Featured />
      <Bundle />
    </Box>
  );
};

export default Home;
