import { LogLevel } from "@azure/msal-browser";

const TENANT_ID = "31886941-8a86-4f93-8f42-d140eaea36ad";

export const msalConfig = {
  auth: {
    clientId: "2e32e834-5b18-4f82-a0b8-32e623d944b4",
    authority: `https://login.microsoftonline.com/${TENANT_ID}/`,
    redirectUri: "/authentication/login-callback",
    postLogoutRedirectUri: ["/phd", "/doctoral-center"],
    navigateToLoginRequestUrl: false
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

export const loginRequest = {
  scopes: ["api://4e2b4a7f-3735-4cac-abd8-808c02dbe14d/BlazorHostedAPI.Access"]
};
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
