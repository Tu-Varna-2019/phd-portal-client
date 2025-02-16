import { Box } from "@mui/material";
import { Image } from "@mui/icons-material";

export const metadata = {
  title: "Докторантски център - Tu-Varna",
  description: "Технически университет Варна"
};

export default function Page() {
  return (
    <Box sx={{ width: 300 }} justifyContent={"center"} alignItems={"center"}>
      <Image
        src={"/default-avatar.jpg"}
        alt="Technical unversity of Varna"
        sx={{ width: 300, height: 300 }}
      />
    </Box>
  );
}
