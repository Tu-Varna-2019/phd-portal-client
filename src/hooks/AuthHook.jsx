"use client";

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/auth/authConfig";
import { useAppDispatch } from "@/lib/features/constants";
import { useEffect } from "react";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import { useRouter } from "next/navigation";
import { setPhd } from "@/lib/features/phd/slices/phdSlice";
import { setDoctoralCenter } from "@/lib/features/doctoralCenter/slices/doctoralCenterSlice";

export default function AuthHook() {
  const { instance } = useMsal();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchRole = async (userCreds, accessToken) => {
    const result = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        Authorization: accessToken
      },
      body: JSON.stringify(userCreds)
    });
    const response = await result.json();
    return response;
  };

  const evaluateRole = (data, role) => {
    switch (role) {
      case "doctoralCenter":
        dispatch(setDoctoralCenter({ data }));
        break;
      case "phd":
        dispatch(setPhd({ data }));
        break;
      default:
        console.error(`Invalid role ${role}`);
    }
  };

  useEffect(() => {
    const handleLogin = async () => {
      const response = await instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });

      if (response) {
        const userCreds = {
          oid: response.idTokenClaims.oid,
          name: response.idTokenClaims.name,
          email: response.idTokenClaims.email
        };
        const accessToken = response.accessToken;
        dispatch(setSessionToken({ accessToken }));

        const roleResponse = await fetchRole(userCreds, accessToken);
        console.log(`Role response ${JSON.stringify(roleResponse)}`);

        evaluateRole(roleResponse.data, roleResponse.role);

        router.push("/" + roleResponse.role);
      }
    };
    handleLogin();
  }, [instance, loginRequest, dispatch]);
}
