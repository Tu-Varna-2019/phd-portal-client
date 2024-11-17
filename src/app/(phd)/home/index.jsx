"use client";

import React, { useState } from "react";
import { PageLayout } from "@/components/layout";
import { loginRequest } from "@/lib/auth/authConfig";
import { callMsGraph } from "@/lib/auth/graph";
import { ProfileData } from "@/components/profile_data/index";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from "@azure/msal-react";
import "./App.css";
import { Button } from "@mui/material";
/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [user, setUser] = useState(Object());

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      })
      .then((response) => {
        // console.log(response);
        setUser(response);
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  return (
    <>
      <h5 className="profileContent">Welcome {accounts[0].name}</h5>
      {graphData ? (
        <ProfileData graphData={user} />
      ) : (
        <Button variant="secondary" onClick={RequestProfileData}>
          Request Profile
        </Button>
      )}
    </>
  );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className="card-title">
          Please sign-in to see your profile information.
        </h5>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  return (
    <PageLayout>
      <MainContent />
    </PageLayout>
  );
}
