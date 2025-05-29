import { styled } from "@mui/material/styles";

const Link = styled("a")({
  textDecoration: "underline",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  color: "inherit"
});

export function renderLink(title, href) {
  return <Link href={href}>{title}</Link>;
}
