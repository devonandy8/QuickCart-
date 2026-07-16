import React from "react";
import { Grid, Box, Text, Loader, Center } from "@mantine/core";
import Card from "../ProductCard/ProductCard";

const ProductGrid = ({
  products,
  loading,
  error,
  emptyMessage = "No products found.",
  errorMessage,
}) => {
  if (loading) {
    return (
      <Center py="xl">
        <Loader color="orange" />
      </Center>
    );
  }

  if (error) {
    return (
      <Text c="red" size="sm">
        {errorMessage ?? error}. Make sure Supabase is configured and seed data is loaded.
      </Text>
    );
  }

  if (products.length === 0) {
    return (
      <Text c="dimmed" size="sm">
        {emptyMessage}
      </Text>
    );
  }

  return (
    <Grid>
      {products.map((product) => (
        <Grid.Col
          key={product.id}
          span={{ lg: 12 / 6, md: 3, sm: 4, xs: 6 }}
          style={{ width: 200 }}
        >
          <Card product={product} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ProductGrid;
