import {
  IconShoe,
  IconChartPie3,
  IconChevronDown,
  IconShirt,
  IconNotification,
  IconDeviceDesktop,
  IconHeadphones,
  IconGrillSpatula,
  IconFaceMaskFilled,
  IconBrush,
} from "@tabler/icons-react";
import {
  Anchor,
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
import user from "../../../assets/user.svg";
import classes from "./Header.module.css";

const mockdata = [
  {
    icon: IconDeviceDesktop,
    title: "Electronics",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconShirt,
    title: "Clothing",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconShoe,
    title: "Footwear",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconHeadphones,
    title: "Accessories",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconGrillSpatula,
    title: "Kitchen",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconBrush,
    title: "Beauty and Personal Care",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
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
          <img src={logo} size={30} />

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Home
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Categories
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.red[5]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs" style={{ textDecoration: "none" }}>
                    <Text size="xs" color={theme.colors.red[5]}>
                      View all
                    </Text>
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              Shop
            </a>
            <a href="#" className={classes.link}>
              Contact
            </a>
          </Group>

          <Group
            visibleFrom="sm"
            style={{
              gap: "0",
              alignItems: "center",
            }}
          >
            {" "}
            <Image
              src={user}
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
              }}
            />
            <Button
              variant="default"
              style={{
                border: "none",
              }}
            >
              Account
            </Button>
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

          <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Categories
              </Box>
              <IconChevronDown size={16} color={theme.colors.red[5]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Shop
          </a>
          <a href="#" className={classes.link}>
            Contact
          </a>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
export default Header;
