"use client";

import SignIn from "@/components/auth/SignIn";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate
} from "@azure/msal-react";
import "./App.css";
import Dashboard from "@/components/dashboard/Dashboard";

export default function App() {
  return (
    <>
      <div className="App">
        <AuthenticatedTemplate>
          <Dashboard />
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <SignIn />
        </UnauthenticatedTemplate>
      </div>
    </>
  );
}
