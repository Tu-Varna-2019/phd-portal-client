import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/auth/authConfig";
import { useAppDispatch } from "../features/constants";
import { clearSessionToken } from "../features/sessionToken/slices/sessionTokenSlice";

export default function Auth() {
  const { instance } = useMsal();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // NOTE: Not sure this part actually clears all redux store
    dispatch({ type: "CLEAR" });

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
    dispatch(clearSessionToken());
  };

  return {
    handleLogout,
    handleLogin,
    clear
  };
}
