import {
  AppShell,
  Avatar,
  Box,
  Burger,
  Group,
  Menu,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { DoubleNavbar, SideBar } from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import { BasicAppShell } from "../AppShell";
import Chatbox from "../components/Chatbox";
import {
  IconNotification,
  IconNotificationOff,
  IconRings,
} from "@tabler/icons-react";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure();
  const [activeLink, setActiveLink] = useState("Roadmap");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/admin/exams")) {
      setActiveLink("Exams");
    } else {
      setActiveLink("Users");
    }
  }, [location]);

  return (
    <AppShell
      header={{ height: 100 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header className="header flex justify-between px-6">
        <Group h="100%" px="md">
          <img src="/logo.png" alt="logo" width={180} height={180} />
        </Group>
        <Group>
          <Group className="cursor-pointer">
            <img src="/icons/bell.svg" alt="Expand icon" />
            <img src="/icons/expand.svg" alt="Expand icon" />
          </Group>
          <Avatar src="/avatar.png" alt="it's me" />
          <Box>
            <Title order={3}>Đỗ Thị Nhớ</Title>
            <Text size="lg">EN0300 - Frontend Engineer</Text>
          </Box>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" className="navbar">
        <SideBar activeLink={"Roadmap"} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
