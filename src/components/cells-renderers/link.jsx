import { styled } from "@mui/material/styles";

const Link = styled("a")({
  textDecoration: "underline",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  color: "inherit"
});

export function renderLink(name, link) {
  return <Link href={link}>{name}</Link>;
}
