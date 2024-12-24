"use client";

import selectUser from "@/lib/features/user/slices/userMemoSelector";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Unauthorized from "../error/Unauthorized";
import LoadingPageCircle from "../loading/LoadingPageCircle";
import ServerError from "../error/ServerError";
import InProgress from "../error/InProgress";
import DoctoralCenterHome from "@/app/(doctoralCenter)/home/page";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import { useAppDispatch } from "@/lib/features/constants";
import { setPhd } from "@/lib/features/phd/slices/phdSlice";
import { setDoctoralCenter } from "@/lib/features/doctoralCenter/slices/doctoralCenterSlice";

export default function RolebasedView() {
  const user = useSelector(selectUser);
  const sessionTokenSelector = useSelector(selectSessionToken);
  const dispatch = useAppDispatch();

  const [authStatus, setAuthStatus] = useState("loading");
  const [data, setData] = useState(null);

  useEffect(() => {
    const verifyRole = async () => {
      try {
        const result = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            Authorization: sessionTokenSelector.accessToken
          },
          body: JSON.stringify(user)
        });
        const res = await result.json();

        if (result.status == 401) setAuthStatus("unauthorized");
        else {
          setAuthStatus(res.role);
          setData(res.data);
        }
      } catch (error) {
        console.log(`Server error occured: ${error}`);
        setAuthStatus("ServerError");
      }
    };

    verifyRole();
  }, []);

  useEffect(() => {
    if (authStatus == "doctoralCenter") {
      dispatch(setDoctoralCenter({ data }));
    } else if (authStatus == "phd") dispatch(setPhd({ data }));
    else if (authStatus == "committee") console.log("commitee");
    // dispatch(setPhd({ data }));
  }, [authStatus]);

  if (authStatus == "loading") return <LoadingPageCircle />;
  else if (authStatus == "unauthorized") return <Unauthorized />;
  else if (authStatus == "phd") return <InProgress />;
  else if (authStatus == "committee") return <InProgress />;
  else if (authStatus == "doctoralCenter") return <DoctoralCenterHome />;
  else return <ServerError />;
}
