import PropTypes from "prop-types";
import Badge, { badgeClasses } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";

function MenuButton({ count, href = null, ...props }) {
  return (
    <Badge
      color="error"
      badgeContent={count}
      invisible={false}
      sx={{ [`& .${badgeClasses.badge}`]: { right: 2, top: 2 } }}
    >
      <IconButton href={href} size="small" {...props} />
    </Badge>
  );
}

MenuButton.propTypes = {
  showBadge: PropTypes.bool
};

export default MenuButton;
