"use client";

import { useAppDispatch } from "@/lib/features/constants";
import { useEffect } from "react";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import {
  setPhd,
  setDoctoralCenter,
  setCommittee
} from "@/lib/features/user/slices/userSlice";
import Auth from "@/lib/auth/auth";
import UnauthorizedAPI from "@/lib/api/unauthorized";
import DoctoralCenter from "@/models/DoctoralCenter";
import Phd from "@/models/Phd";
import Committee from "@/models/Committee";

export default function AuthHook() {
  const { handleLogin } = Auth();
  const dispatch = useAppDispatch();
  const { fetchLogin } = UnauthorizedAPI();

  const evaluateGroup = async (data, group) => {
    switch (group) {
      case "doctoralCenter":
        if (DoctoralCenter.isDefaultImageNameEQ(data.picture))
          data.pictureBlob = DoctoralCenter.getDefaultPictureBlob();

        dispatch(setDoctoralCenter({ data }));
        break;
      case "phd":
        if (Phd.isDefaultImageNameEQ(data.picture))
          data.pictureBlob = Phd.getDefaultPictureBlob();
        dispatch(setPhd({ data }));
        break;
      case "committee":
        if (Committee.isDefaultImageNameEQ(data.picture))
          data.pictureBlob = Committee.getDefaultPictureBlob();
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

    handleAuth();
  }, [dispatch]);
}
