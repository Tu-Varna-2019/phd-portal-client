"use client";
import AppTheme from "@/components/shared-theme/AppTheme";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { Card, CardMedia, CardActionArea } from "@mui/material";
import { useSelector } from "react-redux";
import Unauthorized from "./unauthorized";
import { useEffect } from "react";
import AuthHook from "@/hooks/AuthHook";
import Auth from "@/lib/auth/auth";

// export const metadata = {
//   title: "Докторантски център - Tu-Varna",
//   description: "Технически университет Варна"
// };
export default function Page() {
  const sessionToken = useSelector(selectSessionToken);
  const { handleAuth } = AuthHook();
  const { silentLogin } = Auth();

  useEffect(() => {
    const reLogin = async () => {
      const response = await silentLogin();
      if (response) await handleAuth(response);
    };

    reLogin();
  }, []);

  return (
    <AppTheme>
      {sessionToken.group != null ? (
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
      ) : (
        <Unauthorized />
      )}
    </AppTheme>
  );
}
