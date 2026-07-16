import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
  Tabs,
} from "@mantine/core";
import { useAuth } from "../../context/AuthContext";

export default function AuthModal({ opened, onClose, defaultTab = "login" }) {
  const { signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (opened) {
      setActiveTab(defaultTab);
    }
  }, [opened, defaultTab]);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setError("");
    setMessage("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn(email, password);
      handleClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await signUp(email, password, fullName);
      if (data.session) {
        handleClose();
        return;
      }
      setMessage("Check your email to confirm your account, then sign in.");
      setActiveTab("login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Welcome to QuickCart" centered>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List grow mb="md">
          <Tabs.Tab value="login">Log in</Tabs.Tab>
          <Tabs.Tab value="signup">Sign up</Tabs.Tab>
        </Tabs.List>

        {error && (
          <Text c="red" size="sm" mb="sm">
            {error}
          </Text>
        )}
        {message && (
          <Text c="green" size="sm" mb="sm">
            {message}
          </Text>
        )}

        <Tabs.Panel value="login">
          <form onSubmit={handleSignIn}>
            <Stack gap="sm">
              <TextInput
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                label="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" loading={loading} color="orange">
                Log in
              </Button>
            </Stack>
          </form>
        </Tabs.Panel>

        <Tabs.Panel value="signup">
          <form onSubmit={handleSignUp}>
            <Stack gap="sm">
              <TextInput
                label="Full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextInput
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                label="Password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" loading={loading} color="orange">
                Create account
              </Button>
            </Stack>
          </form>
        </Tabs.Panel>
      </Tabs>
    </Modal>
  );
}
