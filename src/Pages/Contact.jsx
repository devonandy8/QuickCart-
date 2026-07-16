import React, { useState } from "react";
import { Box, Text, TextInput, Textarea, Button, Stack, Paper, Group } from "@mantine/core";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import classes from "./Page.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Box className={classes.page}>
      <Text className={classes.title}>Contact Us</Text>
      <Text c="dimmed" size="sm" mb="lg">
        Questions about orders, products, or your account? We are here to help.
      </Text>

      <Stack gap="lg" maw={720}>
        <Paper className={classes.card}>
          <Stack gap="sm">
            <GroupItem icon={IconMail} label="Email" value="support@quickcart.com" />
            <GroupItem icon={IconPhone} label="Phone" value="+1 (555) 012-3456" />
            <GroupItem icon={IconMapPin} label="Address" value="123 Commerce Street, San Francisco, CA" />
          </Stack>
        </Paper>

        <Paper className={classes.card}>
          <form onSubmit={handleSubmit}>
            <Stack gap="sm">
              <TextInput
                label="Name"
                required
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
              />
              <TextInput
                label="Email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <Textarea
                label="Message"
                required
                minRows={4}
                value={message}
                onChange={(event) => setMessage(event.currentTarget.value)}
              />
              {submitted && (
                <Text c="green" size="sm">
                  Thanks for reaching out. We will get back to you within 1–2 business days.
                </Text>
              )}
              <Button type="submit" color="orange" radius="xl" w="fit-content">
                Send message
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Box>
  );
};

function GroupItem({ icon: Icon, label, value }) {
  return (
    <Group gap="sm" align="flex-start">
      <Icon size={18} color="#ea580c" style={{ marginTop: 2 }} />
      <Box>
        <Text size="sm" fw={600}>
          {label}
        </Text>
        <Text size="sm" c="dimmed">
          {value}
        </Text>
      </Box>
    </Group>
  );
}

export default Contact;
