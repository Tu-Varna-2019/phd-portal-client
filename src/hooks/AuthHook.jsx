"use client";
import { useAppDispatch } from "@/lib/features/constants";
import { useEffect } from "react";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import { useRouter } from "next/navigation";
import { setPhd } from "@/lib/features/phd/slices/phdSlice";
import { setDoctoralCenter } from "@/lib/features/doctoralCenter/slices/doctoralCenterSlice";
import { setCommittee } from "@/lib/features/committee/slices/committeeSlice";
import Auth from "@/lib/auth/auth";

export default function AuthHook() {
  const { handleLogin } = Auth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchRole = async (userCreds, accessToken) => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          Authorization: accessToken
        },
        body: JSON.stringify(userCreds)
      });

      console.log(`response ${response.status}`);
      if (response.status == 500) router.push("/server-error");
      else if (response.status == 401) router.push("/unauthorized");
      else {
        const result = await response.json();
        return result;
      }
    } catch (exception) {
      console.error(`Server error when trying to log in ${exception}`);
      router.push("/server-error");
    }
  };

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
        const accessToken = response.accessToken;
        dispatch(setSessionToken({ accessToken }));

        const roleResponse = await fetchRole(userCreds, accessToken);
        if (roleResponse) {
          evaluateRole(roleResponse.data, roleResponse.role);
          router.push("/" + roleResponse.role);
        }
      }
    };
    handleAuth();
  }, [dispatch]);
}
