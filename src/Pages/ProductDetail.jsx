import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Text, Image, Button, Group } from "@mantine/core";

const ProductDetailPage = () => {
  const { state } = useLocation();
  const { product } = state || {};
  const { id } = useParams();

  if (!product) {
    return <Text>Product not found. Go back and try again.</Text>;
  }

  return (
    <Box p="lg" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Image
        src={
          product.images?.edges?.[0]?.node?.url ||
          product.image?.[0] ||
          "https://via.placeholder.com/300"
        }
        alt={product.name}
        radius="md"
        mb="md"
      />
      <Text fz="xl" fw={700} mb="sm">
        {product.name}
      </Text>
      <Text fz="sm" color="dimmed" mb="md">
        {product.description}
      </Text>
      <Text fz="lg" fw={600} mb="md">
        ${product.variants.edges[0].node.price.amount}
      </Text>

      <Group mt="md">
        <Button radius="xl" color="orange">
          Add to Cart
        </Button>
        <Button radius="xl" variant="outline">
          Back to Shop
        </Button>
      </Group>
    </Box>
  );
};

export default ProductDetailPage;
