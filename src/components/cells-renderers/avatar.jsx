import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

export function renderAvatar(params) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      alt="Avatar"
      sx={{ bgcolor: deepOrange[500] }}
      src={params.row.pictureBlob}
      style={{ backgroundColor: params.value.color, width: 35, height: 35 }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}
