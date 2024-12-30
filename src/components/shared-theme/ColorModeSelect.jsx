import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function ColorModeSelect(props) {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
  return (
    <Select
      value={mode}
      onChange={(event) => setMode(event.target.value)}
      SelectDisplayProps={{
        "data-screenshot": "toggle-mode"
      }}
      {...props}
    >
      <MenuItem value="system">По подразбиране</MenuItem>
      <MenuItem value="light">Светъл режим</MenuItem>
      <MenuItem value="dark">Тъмен режим</MenuItem>
    </Select>
  );
}
