"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/features/constants";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import { useSelector } from "react-redux";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";
import Auth from "@/lib/auth/auth";
import { useMsal } from "@azure/msal-react";

export const GlobalApp = () => {
  const dispatch = useAppDispatch();
  const { silentLogin, amIAuthenticated } = Auth();
  const { instance, accounts } = useMsal();
  const sessionToken = useSelector(selectSessionToken);

  useEffect(() => {
    let timeout, interval;

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
        timeout = setTimeout(refreshToken, refreshTime);

        if (interval) {
          clearInterval(interval);
        }

        interval = setInterval(() => {
          if (expiry > 0) {
            expiry -= 1000;

            // const tokenExpiry = Math.round(expiry / 1000);
            // NOTE: can be safely removed
            return;
          }
          clearInterval(interval);
        }, 1000);
      } catch (exception) {
        console.log(`Error in refreshing token: ${exception} `);
      }
    };

    if (amIAuthenticated) {
      refreshToken();
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [instance, accounts]);
};
