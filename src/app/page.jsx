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
import RolebasedView from "@/components/auth/RolebasedView";

export default function Page() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <MsalProvider instance={msalInstance}>
        <StoreProvider>
          <AuthenticatedTemplate>
            <RolebasedView />
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <AuthHook />
          </UnauthenticatedTemplate>
        </StoreProvider>
      </MsalProvider>
    </>
  );
}
