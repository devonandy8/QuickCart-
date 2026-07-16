import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconChevronDown, IconShoppingCart } from "@tabler/icons-react";
import {
  Anchor,
  Badge,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../../../assets/logo.svg";
import userIcon from "../../../assets/user.svg";
import classes from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { CATEGORY_NAV, getCategoryProductsPath } from "../../lib/categories";
import AuthModal from "../Auth/AuthModal";

function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const [authOpened, setAuthOpened] = useState(false);
  const [authTab, setAuthTab] = useState("login");
  const theme = useMantineTheme();
  const { user, profile, signOut, isAuthenticated } = useAuth();
  const { itemCount } = useCart();

  const openAuth = (tab) => {
    setAuthTab(tab);
    setAuthOpened(true);
    closeDrawer();
  };

  const categoryLinks = CATEGORY_NAV.map((item) => (
    <UnstyledButton
      className={classes.subLink}
      key={item.slug}
      component={Link}
      to={getCategoryProductsPath(item.slug)}
      onClick={closeDrawer}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.red[5]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box className={classes.roots}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link to="/">
            <img src={logo} alt="QuickCart" style={{ height: 30 }} />
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Link to="/products" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Categories
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.red[5]} />
                  </Center>
                </Link>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Shop by category</Text>
                  <Anchor component={Link} to="/products" fz="xs" style={{ textDecoration: "none" }}>
                    <Text size="xs" color={theme.colors.red[5]}>
                      View all
                    </Text>
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {categoryLinks}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        New here?
                      </Text>
                      <Text size="xs" c="dimmed">
                        Create an account to save your cart across devices.
                      </Text>
                    </div>
                    <Button
                      variant="default"
                      onClick={() => openAuth("signup")}
                    >
                      Get started
                    </Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link to="/products" className={classes.link}>
              Shop
            </Link>
            <Link to="/contact" className={classes.link}>
              Contact
            </Link>
          </Group>

          <Group visibleFrom="sm" gap="xs" align="center">
            <UnstyledButton component={Link} to="/cart" aria-label="Cart">
              <Box style={{ position: "relative", display: "flex" }}>
                <IconShoppingCart size={22} color="#4b5563" />
                {itemCount > 0 && (
                  <Badge
                    size="xs"
                    circle
                    color="orange"
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -8,
                      minWidth: 18,
                      height: 18,
                      padding: 0,
                    }}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </Badge>
                )}
              </Box>
            </UnstyledButton>

            {isAuthenticated ? (
              <>
                <UnstyledButton component={Link} to="/account">
                  <Group gap={8} wrap="nowrap">
                    <Image
                      src={profile?.avatar_url || userIcon}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                      }}
                    />
                    <Text size="sm" fw={500}>
                      {profile?.full_name || user?.email?.split("@")[0]}
                    </Text>
                  </Group>
                </UnstyledButton>
                <Button
                  variant="default"
                  style={{ border: "none" }}
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                style={{ border: "none" }}
                onClick={() => openAuth("login")}
              >
                Account
              </Button>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <Link to="/" className={classes.link} onClick={closeDrawer}>
            Home
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Categories
              </Box>
              <IconChevronDown size={16} color={theme.colors.red[5]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{categoryLinks}</Collapse>
          <Link to="/products" className={classes.link} onClick={closeDrawer}>
            Shop
          </Link>
          <Link to="/contact" className={classes.link} onClick={closeDrawer}>
            Contact
          </Link>
          <Link to="/cart" className={classes.link} onClick={closeDrawer}>
            Cart {itemCount > 0 ? `(${itemCount})` : ""}
          </Link>
          {isAuthenticated && (
            <Link to="/account" className={classes.link} onClick={closeDrawer}>
              My account
            </Link>
          )}

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {isAuthenticated ? (
              <Button variant="default" onClick={() => signOut()}>
                Sign out
              </Button>
            ) : (
              <>
                <Button variant="default" onClick={() => openAuth("login")}>
                  Log in
                </Button>
                <Button color="orange" onClick={() => openAuth("signup")}>
                  Sign up
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>

      <AuthModal
        opened={authOpened}
        onClose={() => setAuthOpened(false)}
        defaultTab={authTab}
      />
    </Box>
  );
}

export default Header;
