import Avatar from "@mui/material/Avatar";

export function renderAvatar(params) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      style={{ backgroundColor: params.value.color, width: 28, height: 28 }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}
