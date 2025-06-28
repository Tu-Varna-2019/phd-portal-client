"use client";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import AuthInfo from "@/components/pages/AuthInfo";
import { GlobalApp } from "../GlobalApp";

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
