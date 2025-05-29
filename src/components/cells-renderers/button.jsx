import { Button } from "@mui/material";

export function renderButton(title, onClick) {
  return <Button onClick={onClick}>{title}</Button>;
}
