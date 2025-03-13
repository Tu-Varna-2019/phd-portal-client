"use client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LanguageIcon from "@mui/icons-material/Language";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import ContactsIcon from "@mui/icons-material/Contacts";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@mui/material";

export default function MenuContent({ mainListItems }) {
  const path = usePathname();
  const { t, i18n } = useTranslation("client-page");

  const languagesShort = [t("bg"), t("en")];

  const changeLanguage = (lang) => {
    i18n.changeLanguage(t(lang, { lng: "en" }));
  };

  const secondaryListItems = [
    { text: "Контакти", icon: <ContactsIcon /> },
    {
      text: "Език: Български",
      icon: <LanguageIcon />,
      component: (
        <Select value={t(i18n.language)} onChange={changeLanguage}>
          {languagesShort.map((lang) => {
            return <MenuItem value={lang}>{lang}</MenuItem>;
          })}
        </Select>
      )
    }
  ];

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton href={item.url} selected={item.url == path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "flex" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
            {item.component != undefined ? item.component : <></>}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
