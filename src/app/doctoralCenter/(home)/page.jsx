"use client";

import { msalConfig } from "@/lib/auth/authConfig";
import Layout from "@/components/main-layout/Layout";
import selectDoctoralCenter from "@/lib/features/doctoralCenter/slices/doctoralCenterMemoSelector";
import { useSelector } from "react-redux";

import { AuthenticatedTemplate } from "@azure/msal-react";

import { PublicClientApplication } from "@azure/msal-browser";
import "@/hooks/AuthHook";
import { MsalProvider } from "@azure/msal-react";

export default function Page() {
  // const msalInstance = new PublicClientApplication(msalConfig);
  const doctoralCenter = useSelector(selectDoctoralCenter);
  const user = {
    name: doctoralCenter.name,
    email: doctoralCenter.email,
    picture: doctoralCenter.picture
  };

  return <Layout user={user} />;
}
