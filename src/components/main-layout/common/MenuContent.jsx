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
import { MenuItem, Select } from "@mui/material";
import Translate from "@/lib/helpers/Translate";

export default function MenuContent({ mainListItems }) {
  const path = usePathname();
  const { tr, changeLanguage, language } = Translate();
  const languagesShort = [tr("bg"), tr("en")];

  const secondaryListItems = [
    { text: tr("Contacts"), icon: <ContactsIcon /> },
    {
      text: tr("Language"),
      icon: <LanguageIcon />,
      component: (
        <Select value={tr(language)} onChange={changeLanguage}>
          {languagesShort.map((lang, index) => {
            return (
              <MenuItem key={index} value={lang}>
                {lang}
              </MenuItem>
            );
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
