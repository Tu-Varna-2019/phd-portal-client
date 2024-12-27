import { createSelector } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

import SessionToken from "@/models/auth/SessionToken";

const selectSessionTokenState = (state) => state.sessionToken.sessionToken;

const selectSessionToken = createSelector(
  [selectSessionTokenState],
  (stateSessionToken) => {
    return stateSessionToken
      ? deserialize(SessionToken, stateSessionToken)
      : null;
  }
);

export default selectSessionToken;
