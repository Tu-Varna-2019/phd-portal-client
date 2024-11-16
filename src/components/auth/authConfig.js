/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

const TENANT_NAME = "backswyb2c";

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_susi_v2",
    forgotPassword: "B2C_1_reset_v3",
    editProfile: "B2C_1_edit_profile_v2"
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${TENANT_NAME}.b2clogin.com/${TENANT_NAME}.onmicrosoft.com/b2c_1_susi`
    },
    editProfile: {
      authority: `https://${TENANT_NAME}.b2clogin.com/${TENANT_NAME}.onmicrosoft.com/b2c_1_edit_profile_v2`
    }
  },
  authorityDomain: `${TENANT_NAME}.b2clogin.com`
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    /* eslint-disable no-undef */
    clientId: `${process.env.NEXT_PUBLIC_CLIENT_ID}`,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false
    // grant_type: "authorization_code",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      }
    }
  }
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  tuvarna: {
    endpoint: "http://localhost:3000/api/tuvarna",
    scopes: {
      read: [`https://${TENANT_NAME}.onmicrosoft.com/tasks.read`],
      write: [`https://${TENANT_NAME}.onmicrosoft.com/tasks.write`]
    }
  }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [
    ...protectedResources.tuvarna.scopes.read,
    ...protectedResources.tuvarna.scopes.write
  ]
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
