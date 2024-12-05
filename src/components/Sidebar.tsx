import { Box, Title } from "@mantine/core";
import classes from "./SideBar.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  activeLink: string;
}

const linksMockdata = [
  {
    id: 1,
    label: "Remote",
    link: "/roadmap",
    icon: "/icons/wifi.svg",
  },
  {
    id: 2,
    label: "Ekudos",
    link: "/quiz",
    icon: "/icons/dollar.svg",
  },
  {
    id: 3,
    label: "Eno Path",
    link: "/roadmap",
    icon: "/icons/EnoPath.svg",
  },
  {
    id: 4,
    label: "Settings",
    link: "/quiz",
    icon: "/icons/settings.svg",
  },
];

export function SideBar({ activeLink }: SideBarProps) {
  const navigate = useNavigate();

  const links = linksMockdata.map((item) => (
    <Box className="flex items-center pl-8 mb-8">
      <img src={item.icon} alt="" width={30} height={30} />
      <a
        className={classes.link}
        data-active={activeLink === item.label || undefined}
        href={item.link}
        key={item.id}
      >
        {item.label}
      </a>
    </Box>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.main}>{links}</div>
      </div>
    </nav>
  );
}
