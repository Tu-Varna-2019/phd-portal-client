"use client";

import { useAppDispatch } from "@/lib/features/constants";
import { useEffect, useState } from "react";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import {
  setPhd,
  setDoctoralCenter,
  setCommittee
} from "@/lib/features/user/slices/userSlice";
import Auth from "@/lib/auth/auth";
import UnauthorizedAPI from "@/lib/api/unauthorized";

export default function AuthHook() {
  const { handleLogin } = Auth();
  const dispatch = useAppDispatch();
  const { fetchLogin } = UnauthorizedAPI();

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

  const handleAuth = async (response) => {
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
  };

  useEffect(() => {
    const authLoginHook = async () => {
      const response = await handleLogin();
      if (response) await handleAuth(response);
    };

    authLoginHook();
  }, []);

  return {
    handleAuth
  };
}
