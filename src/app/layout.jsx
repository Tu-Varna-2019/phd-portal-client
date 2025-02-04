"use client";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./StoreProvider";

import { msalConfig } from "@/lib/auth/authConfig";

import AuthHook from "@/hooks/AuthHook";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";

import { PublicClientApplication } from "@azure/msal-browser";

import { MsalProvider } from "@azure/msal-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

// export const metadata = {
// 	title: "Create Next App",
// 	description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <MsalProvider instance={msalInstance}>
            <StoreProvider>
              <AuthenticatedTemplate>{children}</AuthenticatedTemplate>

              <UnauthenticatedTemplate>
                <AuthHook />
              </UnauthenticatedTemplate>
            </StoreProvider>
          </MsalProvider>
        </body>
      </html>
    </>
  );
}
