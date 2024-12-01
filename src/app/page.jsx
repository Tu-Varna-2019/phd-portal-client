"use client";

import React from "react";
import App from "@/app/(phd)/home/index";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/lib/auth/authConfig";
import StoreProvider from "@/app/StoreProvider";

export default function Home() {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <MsalProvider instance={msalInstance}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </MsalProvider>
    </>
  );
}
