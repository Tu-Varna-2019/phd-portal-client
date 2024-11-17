/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

"use client";

import React from "react";

import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

import Navbar from "react-bootstrap/Navbar";

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();
  console.log(isAuthenticated);

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <a className="navbar-brand" href="/">
          Microsoft Identity Platform
        </a>
        <SignInButton />
        <div className="collapse navbar-collapse justify-content-end">
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </Navbar>
      <div className="title">
        <h5>
          Welcome to the Microsoft Authentication Library For JavaScript - React
          SPA
        </h5>
      </div>
      <div className="profileContent">{props.children}</div>
    </>
  );
};
