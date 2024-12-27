import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LanguageIcon from "@mui/icons-material/Language";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import ContactsIcon from "@mui/icons-material/Contacts";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useRouter } from "next/navigation";

const handleHomeOnClick = (url) => {
  // const router = useRouter();
  console.log(`button clicked for: ${url}`);
  // router.push(url);
};

const mainListItems = [
  {
    text: "Начална страница",
    icon: <HomeRoundedIcon />,
    url: "home"
  },
  {
    text: "Управление на събития",
    icon: <ReceiptLongIcon />,
    url: "event-management"
  },
  {
    text: "Управление на  потребители",
    icon: <AccountCircleIcon />,
    url: "user-management"
  },
  {
    text: "Неоторизирани потребители",
    icon: <NoAccountsIcon />,
    url: "unauthorized-users-management"
  }
];

const secondaryListItems = [
  { text: "Контакти", icon: <ContactsIcon /> },
  { text: "Език: Български", icon: <LanguageIcon /> }
];

export default function MenuContent() {
  const [itemClicked, setItemClicked] = useState(0);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                handleHomeOnClick(item.url, index);
                setItemClicked(index);
              }}
              selected={index === itemClicked}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
