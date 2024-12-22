"use client";

import selectUser from "@/lib/features/user/slices/userMemoSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Unauthorized from "../error/Unauthorized";
import Dashboard from "../dashboard/Dashboard";
import LoadingPageCircle from "../loading/LoadingPageCircle";
import ServerError from "../error/ServerError";

export default function AuthorizeUser() {
  const user = useSelector(selectUser);
  const [authStatus, setAuthStatus] = useState("loading");

  useEffect(() => {
    const verifyRole = async () => {
      try {
        const result = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            Authorization: user.accessToken
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
        setAuthStatus("serverError");
      }
    };

    verifyRole();
  }, []);

  if (authStatus == "loading") return <LoadingPageCircle />;
  else if (authStatus == "unauthorized") return <Unauthorized />;
  else if (authStatus == "phd") return <Dashboard />;
  else if (authStatus == "doctoralCenter") return <Dashboard />;
  else return <ServerError />;
}
