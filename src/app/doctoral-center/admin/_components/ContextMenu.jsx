import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import { Menu } from "@mui/material";
import Translate from "@/lib/helpers/Translate";

export default function ContextMenu({
  menuAnchor,
  setMenuAnchor,
  onDeleteClick,
  deleteDisabled
}) {
  const { tr } = Translate();

  return (
    <Paper sx={{ width: 320, maxWidth: "100%" }}>
      <Menu
        anchorEl={menuAnchor}
        open={menuAnchor}
        onClose={() => setMenuAnchor(false)}
      >
        <MenuList>
          <MenuItem onClick={onDeleteClick} disabled={deleteDisabled}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{tr("delete")}</ListItemText>
          </MenuItem>
          <Divider />
        </MenuList>
      </Menu>
    </Paper>
  );
}
