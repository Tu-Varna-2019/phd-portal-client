"use client";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import { GlobalApp } from "@/app/GlobalApp";
import AuthInfo from "@/components/pages/AuthInfo";

export default function RootLayout({ children }) {
  return (
    <>
      <AuthenticatedTemplate>
        {children}
        <GlobalApp />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <AuthInfo />
      </UnauthenticatedTemplate>
    </>
  );
}
