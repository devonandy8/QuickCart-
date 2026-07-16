import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Group,
  Stack,
  Loader,
  Center,
  Image,
  NumberInput,
  Divider,
  Paper,
} from "@mantine/core";
import { IconShoppingCart, IconTrash } from "@tabler/icons-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getDisplayPrice, getProductImage } from "../lib/products";
import classes from "./Page.module.css";

const Cart = () => {
  const { items, loading, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [updatingId, setUpdatingId] = useState(null);

  const handleQuantityChange = async (productId, value) => {
    const quantity = typeof value === "number" ? value : 1;
    setUpdatingId(productId);
    try {
      if (quantity <= 0) {
        await removeItem(productId);
      } else {
        await updateQuantity(productId, quantity);
      }
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <Center py="xl">
        <Loader color="orange" />
      </Center>
    );
  }

  return (
    <Box className={classes.page}>
      <Text className={classes.title}>Your Cart</Text>
      <Text c="dimmed" size="sm" mb="lg">
        {isAuthenticated
          ? "Your saved items sync to your account."
          : "Sign in to save your cart across devices."}
      </Text>

      {itemCount === 0 ? (
        <Paper className={classes.card} p="xl">
          <Stack align="center" gap="md">
            <IconShoppingCart size={48} color="#d1d5db" />
            <Text fw={500}>Your cart is empty</Text>
            <Text c="dimmed" size="sm" ta="center">
              Browse products and add items to get started.
            </Text>
            <Button component={Link} to="/products" color="orange" radius="xl">
              Browse products
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Stack gap="lg">
          {items.map((item) => {
            const price = getDisplayPrice(item.product);
            return (
              <Paper key={item.productId} className={classes.card} p="md">
                <Group align="flex-start" wrap="nowrap" gap="md">
                  <Image
                    src={getProductImage(item.product)}
                    alt={item.product.name}
                    w={96}
                    h={96}
                    radius="md"
                    fit="contain"
                    style={{ background: "rgba(107,114,128,0.08)" }}
                  />
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Text fw={600} mb={4}>
                      {item.product.name}
                    </Text>
                    <Text size="sm" c="dimmed" lineClamp={2} mb="sm">
                      {item.product.description}
                    </Text>
                    <Group justify="space-between" align="center" wrap="wrap">
                      <Text fw={600}>${price.toFixed(2)}</Text>
                      <Group gap="sm">
                        <NumberInput
                          value={item.quantity}
                          min={1}
                          max={99}
                          w={90}
                          size="sm"
                          disabled={updatingId === item.productId}
                          onChange={(value) => handleQuantityChange(item.productId, value)}
                        />
                        <Button
                          variant="subtle"
                          color="red"
                          size="compact-sm"
                          leftSection={<IconTrash size={14} />}
                          onClick={() => removeItem(item.productId)}
                        >
                          Remove
                        </Button>
                      </Group>
                    </Group>
                    <Text size="sm" mt="xs" c="dimmed">
                      Line total: ${(price * item.quantity).toFixed(2)}
                    </Text>
                  </Box>
                </Group>
              </Paper>
            );
          })}

          <Paper className={classes.card} p="md">
            <Group justify="space-between" mb="md">
              <Text fw={600}>Subtotal ({itemCount} items)</Text>
              <Text fw={700} size="lg">
                ${subtotal.toFixed(2)}
              </Text>
            </Group>
            <Divider mb="md" />
            <Group justify="space-between">
              <Button component={Link} to="/products" variant="outline" radius="xl">
                Continue shopping
              </Button>
              <Button color="orange" radius="xl" disabled>
                Checkout coming soon
              </Button>
            </Group>
          </Paper>
        </Stack>
      )}
    </Box>
  );
};

export default Cart;
