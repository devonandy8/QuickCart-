import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Stack,
  Paper,
  Group,
  TextInput,
  Loader,
  Center,
} from "@mantine/core";
import { IconShoppingCart, IconLogout } from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";
import classes from "./Page.module.css";

const Account = () => {
  const navigate = useNavigate();
  const { user, profile, loading, isAuthenticated, signOut, refreshProfile } = useAuth();
  const { itemCount } = useCart();
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    setFullName(profile?.full_name ?? "");
  }, [profile]);

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    if (!user) return;

    setSaving(true);
    setError("");
    setMessage("");

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() })
      .eq("id", user.id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    await refreshProfile();
    setMessage("Profile updated successfully.");
  };

  if (loading || !isAuthenticated) {
    return (
      <Center py="xl">
        <Loader color="orange" />
      </Center>
    );
  }

  return (
    <Box className={classes.page}>
      <Text className={classes.title}>My Account</Text>
      <Text c="dimmed" size="sm" mb="lg">
        Manage your profile and access your saved cart.
      </Text>

      <Stack gap="lg" maw={640}>
        <Paper className={classes.card}>
          <Stack gap="sm">
            <Text fw={600}>Profile</Text>
            <Text size="sm" c="dimmed">
              Signed in as {user?.email}
            </Text>
            <form onSubmit={handleSaveProfile}>
              <Stack gap="sm">
                <TextInput
                  label="Full name"
                  value={fullName}
                  onChange={(event) => setFullName(event.currentTarget.value)}
                />
                {error && (
                  <Text c="red" size="sm">
                    {error}
                  </Text>
                )}
                {message && (
                  <Text c="green" size="sm">
                    {message}
                  </Text>
                )}
                <Button type="submit" color="orange" radius="xl" loading={saving} w="fit-content">
                  Save changes
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>

        <Paper className={classes.card}>
          <Group justify="space-between" align="center">
            <Box>
              <Text fw={600}>Saved cart</Text>
              <Text size="sm" c="dimmed">
                {itemCount} item{itemCount === 1 ? "" : "s"} in your cart
              </Text>
            </Box>
            <Button
              component={Link}
              to="/cart"
              color="orange"
              radius="xl"
              leftSection={<IconShoppingCart size={16} />}
            >
              View cart
            </Button>
          </Group>
        </Paper>

        <Paper className={classes.card}>
          <Group justify="space-between" align="center">
            <Box>
              <Text fw={600}>Quick links</Text>
              <Text size="sm" c="dimmed">
                Continue shopping or browse by category
              </Text>
            </Box>
            <Group>
              <Button component={Link} to="/products" variant="outline" radius="xl">
                Shop
              </Button>
              <Button component={Link} to="/contact" variant="outline" radius="xl">
                Contact
              </Button>
            </Group>
          </Group>
        </Paper>

        <Button
          variant="light"
          color="red"
          radius="xl"
          leftSection={<IconLogout size={16} />}
          onClick={() => signOut()}
          w="fit-content"
        >
          Sign out
        </Button>
      </Stack>
    </Box>
  );
};

export default Account;
