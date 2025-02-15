"use client";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { loginRequest } from "@/lib/auth/authConfig";
import { useAppDispatch } from "@/lib/features/constants";
import { setSessionToken } from "@/lib/features/sessionToken/slices/sessionTokenSlice";
import { useSelector } from "react-redux";
import selectSessionToken from "@/lib/features/sessionToken/slices/sessionTokenMemoSelector";

export const GlobalApp = () => {
  const dispatch = useAppDispatch();
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const sessionToken = useSelector(selectSessionToken);
  useEffect(() => {
    let timeout, interval;

    const refreshToken = async () => {
      try {
        console.log("Refreshing token...");
        const token = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0]
        });

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

            const tokenExpiry = Math.round(expiry / 1000);
            // NOTE: can be safely removed
            console.log(`Token expiry: ${tokenExpiry}`);
            return;
          }
          clearInterval(interval);
        }, 1000);
      } catch (exception) {
        console.log(`Error in refreshing token: ${exception} `);
      }
    };

    if (!isAuthenticated) {
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
  }, [instance, accounts, isAuthenticated]);
};
