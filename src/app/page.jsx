"use client";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import "@/hooks/AuthHook";
import Dashboard from "@/components/dashboard/Dashboard";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/lib/auth/authConfig";
import StoreProvider from "@/app/StoreProvider";
import AuthHook from "@/hooks/AuthHook";
import { useEffect } from "react";

export default function Page() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <MsalProvider instance={msalInstance}>
        <StoreProvider>
          <AuthenticatedTemplate>
            <Dashboard />
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <AutoLogin />
          </UnauthenticatedTemplate>
        </StoreProvider>
      </MsalProvider>
    </>
  );
}

const AutoLogin = () => {
  const { handleLogin } = AuthHook();

  useEffect(() => {
    handleLogin();
  }, []);

  return null;
};
