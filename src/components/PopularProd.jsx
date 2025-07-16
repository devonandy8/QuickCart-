import React from "react";
import { Grid, Box, Text } from "@mantine/core";
import Card from "./ProductCard/ProductCard";

const PopularProd = ({ products }) => {
  return (
    <Box style={{ margin: "20px 0" }}>
      <Text
        style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: "20px" }}
      >
        Popular Products
      </Text>
      <Grid>
        {products.map((product) => (
          <Grid.Col
            key={product._id}
            span={{ lg: 12 / 5, md: 3, sm: 4, xs: 6 }}
            style={{ width: 200 }}
          >
            <Card product={product} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularProd;
