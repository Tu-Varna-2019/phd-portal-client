"use client";

import { callMsGraph } from "@/lib/auth/graph";
import { setUser } from "@/features/user/userSlice.jsx";
import { loginRequest } from "@/lib/auth/authConfig";
import { useEffect, useState } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal
} from "@azure/msal-react";
import "./App.css";
import Dashboard from "@/components/dashboard/Dashboard";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

export default function App() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  const dispatch = useDispatch();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    // BUG: Needs 1 second delay to initialize msalInstance
    const delayTimeout = setTimeout(() => {
      if (instance && accounts.length > 0) {
        requestProfileData();
      }
    }, 1000);
    return () => clearTimeout(delayTimeout);
  }, [instance, accounts]);

  function requestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      })
      .then((response) => {
        dispatch(setUser({ response }));

        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };

  return (
    <>
      <div className="App">
        <AuthenticatedTemplate>
          <Dashboard />
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <h5 className="card-title">
            Please sign-in to see your profile information.
          </h5>
          <Button variant="secondary" onClick={() => handleLogin("popup")}>
            Request Profile
          </Button>
        </UnauthenticatedTemplate>
      </div>
    </>
  );
}
