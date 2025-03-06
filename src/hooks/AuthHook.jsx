"use client";

import { useEffect } from "react";
import Auth from "@/lib/auth/auth";
import UnauthorizedAPI from "@/api/unauthorized";
import { useAppDispatch } from "@/features/constants";
import { setSessionToken } from "@/features/sessionToken/slices/sessionTokenSlice";

export default function AuthHook() {
  const { handleLogin, evaluateGroup } = Auth();
  const dispatch = useAppDispatch();
  const { login } = UnauthorizedAPI();

  // TODO: modularize this into one
  useEffect(() => {
    const handleAuth = async () => {
      const response = await handleLogin();

      console.log(`Response: ${response}`);

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
    };

    handleAuth();
  }, []);
}
