"use client";

import { callMsGraph } from "@/lib/auth/graph";
import User from "@/entities/User.jsx";
import { setUser } from "@/features/user/userSlice.jsx";

import { loginRequest } from "@/lib/auth/authConfig";
import React, { useEffect, useState } from "react";

import { useMsal } from "@azure/msal-react";
import { useDispatch } from "react-redux";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";
import "./App.css";
import Dashboard from "@/components/dashboard/Dashboard";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const MainContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [user, setUser] = useState(Object());
  const userSelector = useSelector((state) => state.user.data);

  function RequestProfileData() {
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
    <div className="App">
      <AuthenticatedTemplate>
        <Dashboard />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className="card-title">
          Please sign-in to see your profile information.
        </h5>
        <Button variant="secondary" onClick={RequestProfileData}>
          Request Profile
        </Button>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  return (
    <>
      <MainContent />
    </>
  );
}
