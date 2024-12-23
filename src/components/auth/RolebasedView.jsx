"use client";

import selectUser from "@/lib/features/user/slices/userMemoSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Unauthorized from "../error/Unauthorized";
import LoadingPageCircle from "../loading/LoadingPageCircle";
import ServerError from "../error/ServerError";
import InProgress from "../error/InProgress";
import DoctoralCenterHome from "@/app/(admin)/home/page";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { useAppDispatch } from "@/lib/features/constants";
import { clearUser } from "@/lib/features/user/slices/userSlice";

export default function RolebasedView() {
  const user = useSelector(selectUser);
  const sessionToken = useSelector(selectSessionToken);
  const dispatch = useAppDispatch();

  const [authStatus, setAuthStatus] = useState("loading");

  useEffect(() => {
    const verifyRole = async () => {
      try {
        const result = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            Authorization: sessionToken.accessToken
          },
          body: JSON.stringify({
            oid: user.oid,
            name: user.name,
            email: user.email
          })
        });
        const res = await result.json();

        if (result.status == 401) setAuthStatus("unauthorized");
        else setAuthStatus(res.role);
      } catch (error) {
        console.log("Server error occured!");
        setAuthStatus("ServerError");
      }
    };

    verifyRole();
  }, []);

  // NOTE: Reset stuff
  // if (authStatus != "loading") dispatch(clearUser());

  if (authStatus == "loading") return <LoadingPageCircle />;
  else if (authStatus == "unauthorized") return <Unauthorized />;
  else if (authStatus == "phd") return <InProgress />;
  else if (authStatus == "committee") return <InProgress />;
  else if (authStatus == "doctoralCenter") return <DoctoralCenterHome />;
  else return <ServerError />;
}
