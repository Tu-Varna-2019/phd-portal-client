"use client";
import { msalConfig } from "@/lib/auth/authConfig";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import { PublicClientApplication } from "@azure/msal-browser";

import { MsalProvider } from "@azure/msal-react";
import { GlobalApp } from "@/app/GlobalApp";
import UnauthorizedErrorPage from "@/app/unauthorized";

export default function RootLayout({ children }) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>
        {children}
        <GlobalApp />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <UnauthorizedErrorPage />
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
}
