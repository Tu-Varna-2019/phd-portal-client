"use client";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import "@/hooks/AuthHook";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/lib/auth/authConfig";
import AuthHook from "@/hooks/AuthHook";
import DoctoralCenterHome from "./doctoralCenter/(home)/page";
import PhdHome from "./phd/(home)/page";

export default function Page() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <MsalProvider instance={msalInstance}>
        <AuthenticatedTemplate>
          <DoctoralCenterHome />
          <PhdHome />
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <AuthHook />
        </UnauthenticatedTemplate>
      </MsalProvider>
    </>
  );
}
