import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Button,
  Group,
  Loader,
  Center,
  Stack,
} from "@mantine/core";
import { fetchProductById, getDisplayPrice, getProductImage } from "../lib/products";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchProductById(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);


  if (loading) {
    return (
      <Center p="xl">
        <Loader color="orange" />
      </Center>
    );
  }

  if (error || !product) {
    return (
      <Center p="xl">
        <Stack align="center">
          <Text>Product not found.</Text>
          <Button radius="xl" variant="outline" onClick={() => navigate("/products")}>
            Back to Shop
          </Button>
        </Stack>
      </Center>
    );
  }

  const displayPrice = getDisplayPrice(product);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addItem(product.id, 1);
      setAdded(true);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Box p="lg" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Image
        src={getProductImage(product)}
        alt={product.name}
        radius="md"
        mb="md"
      />
      <Text fz="xl" fw={700} mb="sm">
        {product.name}
      </Text>
      <Text fz="sm" c="dimmed" mb="md">
        {product.description}
      </Text>
      <Group gap="sm" mb="md">
        {product.offerPrice && (
          <Text fz="sm" c="dimmed" td="line-through">
            ${product.price.toFixed(2)}
          </Text>
        )}
        <Text fz="lg" fw={600}>
          ${displayPrice.toFixed(2)}
        </Text>
      </Group>

      <Group mt="md">
        <Button
          radius="xl"
          color="orange"
          loading={adding}
          onClick={handleAddToCart}
        >
          {added ? "Added to cart" : "Add to Cart"}
        </Button>
        <Button radius="xl" variant="outline" onClick={() => navigate("/cart")}>
          View cart
        </Button>
        <Button radius="xl" variant="subtle" onClick={() => navigate("/products")}>
          Back to Shop
        </Button>
      </Group>
    </Box>
  );
};

export default ProductDetailPage;
