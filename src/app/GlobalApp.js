"use client";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "@/features/constants";
import { setSessionToken } from "@/features/sessionToken/slices/sessionTokenSlice";
import { useSelector } from "react-redux";
import selectSessionToken from "@/features/sessionToken/slices/sessionTokenMemoSelector";
import Auth from "@/lib/auth/auth";

export const GlobalApp = () => {
  const dispatch = useAppDispatch();
  const { silentLogin } = Auth();
  const sessionToken = useSelector(selectSessionToken);
  const { amIAuthenticated } = Auth();
  const timeout = useRef(null);
  const interval = useRef(null);

  useEffect(() => {
    // TODO: Refactor this code
    const refreshToken = async () => {
      try {
        console.log("Refreshing token...");
        const token = await silentLogin();
        console.log("Token refreshed!");

        dispatch(
          setSessionToken({
            session: {
              accessToken: token.accessToken,
              group: sessionToken.group
            }
          })
        );

        let expiry = token?.expiresOn
          ? token?.expiresOn?.getTime() - Date.now()
          : 0;

        const refreshTime = expiry ? Math.max(0, expiry / 2) : 0;
        timeout.current = setTimeout(refreshToken, refreshTime);

        if (interval.current) {
          clearInterval(interval.current);
        }

        interval.current = setInterval(() => {
          if (expiry > 0) {
            expiry -= 1000;
            // const tokenExpiry = Math.round(expiry / 1000);
            return;
          }
          clearInterval(interval.current);
        }, 1000);
      } catch (exception) {
        console.log(`Error in refreshing token: ${exception} `);
      }
    };

    if ((amIAuthenticated, sessionToken.group != null)) {
      refreshToken();
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [amIAuthenticated, sessionToken.group]);
};
