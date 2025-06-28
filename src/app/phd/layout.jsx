"use client";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import AuthInfo from "@/components/pages/AuthInfo";

export default function RootLayout({ children }) {
  return (
    <>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <AuthInfo />
      </UnauthenticatedTemplate>
    </>
  );
}
