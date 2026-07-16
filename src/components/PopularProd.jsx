import React from "react";
import { Box, Text, Group, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid/ProductGrid";

const PopularProd = ({ products, loading, error }) => {
  const topProducts = products.slice(0, 10);

  return (
    <Box style={{ margin: "20px 0" }}>
      <Group justify="space-between" mb="md">
        <Text style={{ fontWeight: 700, fontSize: "1.25rem" }}>
          Popular Products
        </Text>
        <Anchor component={Link} to="/products" size="sm" c="orange">
          View all
        </Anchor>
      </Group>

      <ProductGrid
        products={topProducts}
        loading={loading}
        error={error}
        emptyMessage="No popular products yet. Run supabase/seed.sql in your Supabase project."
      />
    </Box>
  );
};

export default PopularProd;
