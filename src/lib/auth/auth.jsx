import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/auth/authConfig";
import { useAppDispatch } from "@/lib/features/constants";
import {
  clearCommittee,
  clearDoctoralCenter,
  clearPhd,
  setCommittee,
  setDoctoralCenter,
  setPhd
} from "@/lib/features/user/slices/userSlice";
import { clearSessionToken } from "../features/sessionToken/slices/sessionTokenSlice";
import { clearNotifications } from "../features/notification/slices/notificationsSlice";

export default function Auth() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // NOTE: Not sure this part actually clears all redux store
    dispatch(clearSessionToken());
    dispatch(clearNotifications());
    dispatch(clearPhd());
    dispatch(clearCommittee());
    dispatch(clearDoctoralCenter());

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

  const silentLogin = async () => {
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0]
    });
    return response;
  };

  const amIAuthenticated = () => {
    return isAuthenticated && accounts.length > 0;
  };

  const evaluateGroup = async (data, group) => {
    switch (group) {
      case "doctoralCenter":
        dispatch(setDoctoralCenter({ data }));
        break;
      case "phd":
        dispatch(setPhd({ data }));
        break;
      case "committee":
        dispatch(setCommittee({ data }));
        break;
      default:
        console.error(`Invalid role ${role}`);
    }
  };

  return {
    handleLogout,
    handleLogin,
    silentLogin,
    amIAuthenticated,
    evaluateGroup
  };
}
