import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/auth/authConfig";

export default function Auth() {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/"
    });
  };

  const handleLogin = async () => {
    const response = await instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
    return response;
  };

  const clear = () => {
    instance.clearCache();
  };

  return {
    handleLogout,
    handleLogin,
    clear
  };
}
