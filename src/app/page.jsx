"use client";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import "@/hooks/AuthHook";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/lib/auth/authConfig";
import StoreProvider from "@/app/StoreProvider";
import AuthHook from "@/hooks/AuthHook";
import { useEffect } from "react";
import AuthorizeUser from "@/components/auth/AuthorizeUser";

export default function Page() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <MsalProvider instance={msalInstance}>
        <StoreProvider>
          <AuthenticatedTemplate>
            <VerifyRole />
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

const VerifyRole = () => {
  const { verifyRole } = AuthorizeUser();

  useEffect(() => {
    verifyRole();
  }, []);

  return null;
};
