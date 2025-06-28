"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/features/constants";
import { setSessionToken } from "@/features/sessionToken/slices/sessionTokenSlice";
import { useSelector } from "react-redux";
import selectSessionToken from "@/features/sessionToken/slices/sessionTokenMemoSelector";
import Auth from "@/lib/auth/auth";

export const GlobalApp = () => {
  // useEffect(() => {
  //   const refreshToken = async () => {
  //     try {
  //       console.log("Refreshing token...");
  //       const token = await silentLogin();
  //       console.log("Token refreshed!");
  //
  //       dispatch(
  //         setSessionToken({
  //           session: {
  //             accessToken: token.accessToken,
  //             group: sessionToken.group
  //           }
  //         })
  //       );
  //
  //       const expiry = token?.expiresOn?.getTime() || 0;
  //       const refreshTime = Math.max(0, expiry - Date.now() - 5 * 60 * 1000); // 5 mins early
  //
  //       timeout.current = setTimeout(refreshToken, refreshTime);
  //     } catch (exception) {
  //       if (exception.errorCode === "interaction_required") {
  //         console.warn("Silent login failed; interaction required.");
  //         instance.loginRedirect(); // or loginPopup()
  //       } else {
  //         console.error("Token refresh error:", exception);
  //       }
  //     }
  //   };
  //
  //   if (amIAuthenticated && sessionToken.group != null) {
  //     refreshToken();
  //   }
  //
  //   return () => {
  //     if (timeout.current) clearTimeout(timeout.current);
  //     if (interval.current) clearInterval(interval.current);
  //   };
  // }, [amIAuthenticated, sessionToken.group]);
};
