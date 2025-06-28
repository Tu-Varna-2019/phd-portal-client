"use client";

import { useEffect } from "react";
import Auth from "@/lib/auth/auth";
import UnauthorizedAPI from "@/api/unauthorized";
import { useAppDispatch } from "@/features/constants";
import { setSessionToken } from "@/features/sessionToken/slices/sessionTokenSlice";
import { useMsal } from "@azure/msal-react";

export default function AuthHook() {
  const { handleLogin, evaluateGroup } = Auth();
  const dispatch = useAppDispatch();
  const { login } = UnauthorizedAPI();
  const { instance } = useMsal();

  useEffect(() => {
    const handleAuth = async () => {
      const currentAccounts = instance.getAllAccounts();
      const logout = Number(localStorage.getItem("logout"));
      if (currentAccounts.length > 0 || logout != 3) {
        localStorage.setItem("logout", logout + 1);
        return;
      } else {
        console.log("EOEOEO");
        const response = await handleLogin();

        if (response) {
          const loginResponse = await login(response.accessToken);

          if ("data" in loginResponse) {
            const session = {
              group: loginResponse.group,
              accessToken: response.accessToken
            };

            dispatch(setSessionToken({ session }));
            await evaluateGroup(loginResponse.data, loginResponse.group);
            window.location.reload();
          }
        }
      }
    };

    handleAuth();
  }, []);
}
