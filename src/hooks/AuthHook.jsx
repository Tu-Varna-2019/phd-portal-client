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
import FileAPI from "@/lib/api/file";

export default function AuthHook() {
  const { handleLogin } = Auth();
  const dispatch = useAppDispatch();
  const { fetchLogin } = UnauthorizedAPI();
  const { download } = FileAPI();

  const setPictureBlobBase64Url = async (blobPicture, data, setUserPicture) => {
    const blob = await blobPicture.blob();
    let reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onload = () => {
      data.pictureBlob = reader.result;
      dispatch(setUserPicture({ data }));
    };
  };

  const evaluateRole = async (data, role) => {
    switch (role) {
      case "doctoralCenter":
        if (!DoctoralCenter.isDefaultImageNameEQ(data.picture)) {
          const blobPicture = await download("avatar", data.picture);
          await setPictureBlobBase64Url(blobPicture, data, setDoctoralCenter);
        }
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

        if ("data" in loginResponse) {
          const session = {
            group: loginResponse.group,
            accessToken: response.accessToken
          };

          dispatch(setSessionToken({ session }));
          await evaluateRole(loginResponse.data, loginResponse.group);
        }
      }
    };

    handleAuth();
  }, [dispatch]);
}
