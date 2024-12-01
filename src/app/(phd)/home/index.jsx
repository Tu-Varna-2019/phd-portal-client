"use client";

import { callMsGraph } from "@/lib/auth/graph";
import { setUser } from "@/features/user/userSlice.jsx";
import { loginRequest } from "@/lib/auth/authConfig";
import { useEffect } from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal
} from "@azure/msal-react";
import "./App.css";
import Dashboard from "@/components/dashboard/Dashboard";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import MicrosoftIcon from "@mui/icons-material/Microsoft";

export default function App() {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch();

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

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  return (
    <>
      <div className="App">
        <AuthenticatedTemplate>
          <Dashboard />
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              minHeight: "100vh",
              textAlign: "center",
              paddingTop: 5,
              alignItems: "center",
              justifyContent: "justify"
            }}
          >
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <MicrosoftIcon color="lightskyblue" sx={{ fontSize: 60 }} />
              </Box>

              <Typography variant="h4" color="blue" gutterBottom>
                401 - Unauthorized
              </Typography>

              <Typography variant="body1" paragraph>
                You do not have permission to view this page. Please check your
                credentials or contact the administrator.
              </Typography>

              <Box sx={{ marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  sx={{ marginRight: 2 }}
                >
                  Sign in
                </Button>
              </Box>
            </Paper>
          </Container>
        </UnauthenticatedTemplate>
      </div>
    </>
  );
}
