import { Card, CardMedia, CardActionArea } from "@mui/material";

export const metadata = {
  title: "Докторантски център - Tu-Varna",
  description: "Технически университет Варна"
};

export default function Page() {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={"/tu-varna.png"}
          alt="picture"
          sx={{
            width: "700px",
            height: "700px",
            objectFit: "contain",
            objectPosition: "center"
          }}
        />
      </CardActionArea>
    </Card>
  );
}
