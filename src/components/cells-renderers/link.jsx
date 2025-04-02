import { styled } from "@mui/material/styles";

const Link = styled("a")({
  textDecoration: "underline",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  color: "inherit"
});

export function renderLink(title, hrefPrefix) {
  const curriculumLinkMapper = {
    "Автоматизирани системи за обработка и управление на информация":
      "automated-information-processing-and-management-systems",
    "Automated information processing and management systems":
      "automated-information-processing-and-management-systems"
  };

  return <Link href={hrefPrefix + curriculumLinkMapper[title]}>{title}</Link>;
}
