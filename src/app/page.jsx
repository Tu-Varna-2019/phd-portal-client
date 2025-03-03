"use client";
import AppTheme from "@/components/shared-theme/AppTheme";
import selectSessionToken from "@/features/sessionToken/slices/sessionTokenMemoSelector";
import { Card, CardMedia, CardActionArea } from "@mui/material";
import { useSelector } from "react-redux";
import Unauthorized from "./unauthorized";
import { useEffect } from "react";
import { useAppDispatch } from "@/features/constants";
import Auth from "@/lib/auth/auth";
import { setSessionToken } from "@/features/sessionToken/slices/sessionTokenSlice";
import UnauthorizedAPI from "@/api/unauthorized";

// export const metadata = {
//   title: "Докторантски център - Tu-Varna",
//   description: "Технически университет Варна"
// };
export default function Page() {
  const sessionToken = useSelector(selectSessionToken);
  const { evaluateGroup, silentLogin } = Auth();
  const dispatch = useAppDispatch();
  const { login } = UnauthorizedAPI();

  // TODO: modularize this into one
  useEffect(() => {
    const reLogin = async () => {
      console.log("Triggering reLogin");

      const response = await silentLogin();
      const loginResponse = await login(response.accessToken);

      if ("data" in loginResponse) {
        dispatch(
          setSessionToken({
            session: {
              accessToken: response.accessToken,
              group: loginResponse.group
            }
          })
        );
        await evaluateGroup(loginResponse.data, loginResponse.group);
        window.location.reload();
      }
    };

    if (sessionToken.accessToken == null || sessionToken.group == null) {
      reLogin();
    }
  }, [sessionToken]);

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
