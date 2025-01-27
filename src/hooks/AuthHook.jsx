"use client";
import { useAppDispatch } from "@/lib/features/constants";
import { useEffect } from "react";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const evaluateRole = (data, role) => {
    switch (role) {
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
        if (typeof loginResponse == "object") {
          const session = {
            group: loginResponse.group,
            accessToken: response.accessToken
          };
          dispatch(setSessionToken({ session }));

          evaluateRole(loginResponse.data, loginResponse.group);
          router.push("/" + loginResponse.group);
        } else router.push(loginResponse);
      }
    };

    handleAuth();
  }, [dispatch]);
}
