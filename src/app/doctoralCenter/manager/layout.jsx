"use client";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import { GlobalApp } from "@/app/GlobalApp";
import UnauthorizedErrorPage from "@/app/unauthorized";

export default function RootLayout({ children }) {
  return (
    <>
      <AuthenticatedTemplate>
        {children}
        <GlobalApp />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <UnauthorizedErrorPage />
      </UnauthenticatedTemplate>
    </>
  );
}
