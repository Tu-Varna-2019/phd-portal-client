"use client";

import { useMsal } from "@azure/msal-react";
import { setUser } from "@/features/user/slices/userSlice";
import { loginRequest } from "@/lib/auth/authConfig";
import { useAppDispatch } from "@/lib/features/constants";
import { useEffect } from "react";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import { useRouter } from "next/navigation";

export default function AuthHook() {
  const { instance } = useMsal();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // TODO: For some stupid reason this url is valid: https://localhost:3000/
  const loginRedirect = async (user, accessToken) => {
    const result = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        Authorization: accessToken
      },
      body: JSON.stringify(user)
    });
    const response = await result.json();
    return response.role;
  };

  useEffect(() => {
    const handleLogin = async () => {
      const response = await instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });

      if (response) {
        const userInfo = response.idTokenClaims;
        const accessToken = response.accessToken;

        dispatch(setUser({ userInfo }));
        dispatch(setSessionToken({ accessToken }));
        const url = await loginRedirect(userInfo, accessToken);
        router.push("/" + url);
      }
    };
    handleLogin();
  }, [instance, loginRequest, dispatch]);
}
