"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { loginRequest } from "@/lib/auth/authConfig";
import { callMsGraph } from "@/lib/auth/graph";
import { ProfileData } from "@/components/profile_data/index";
import { useMsal } from "@azure/msal-react";
import { User } from "@/entities/User";
import { setUser } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const dispatch = useDispatch();

  function RequestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      })
      .then((response) => {
        dispatch(setUser(User.fromGraphdata(response)));

        callMsGraph(response.accessToken).then((response) =>
          // TODO: Can be removed?
          setGraphData(response)
        );
      });
  }

  // return (
  //   <>
  //     <h5 className="profileContent">Welcome {accounts[0].name}</h5>
  //     {graphData ? (
  //       <ProfileData graphData={user} />
  //     ) : (
  //       <Button variant="secondary" onClick={RequestProfileData}>
  //         Request Profile
  //       </Button>
  //     )}
  //   </>
  // );
};
