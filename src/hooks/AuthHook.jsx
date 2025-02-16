"use client";

import { useEffect } from "react";
import Auth from "@/lib/auth/auth";
import UnauthorizedAPI from "@/lib/api/unauthorized";
import { useAppDispatch } from "@/lib/features/constants";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import { useSelector } from "react-redux";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";

export default function AuthHook() {
  const { handleLogin, evaluateGroup } = Auth();
  const dispatch = useAppDispatch();
  const { fetchLogin } = UnauthorizedAPI();
  const sessionToken = useSelector(selectSessionToken);

  // TODO: modularize this into one
  useEffect(() => {
    const handleAuth = async () => {
      const response = await handleLogin();
      if (response) {
        const userCreds = {
          oid: response.idTokenClaims.oid,
          name: response.idTokenClaims.name,
          email: response.idTokenClaims.email,
          timestamp: Date.now()
        };
        const loginResponse = await fetchLogin(userCreds, response.accessToken);

        if ("data" in loginResponse) {
          const session = {
            group: loginResponse.group,
            accessToken: response.accessToken
          };

          dispatch(setSessionToken({ session }));
          await evaluateGroup(loginResponse.data, loginResponse.group);
        }
      }
    };

    if (sessionToken.accessToken == null) handleAuth();
  }, [dispatch]);
}
