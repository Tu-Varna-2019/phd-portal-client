import SessionToken from "@/models/auth/SessionToken";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize, serialize } from "serializr";

export const sessionTokenSlice = createSlice({
  name: "sessionToken",
  initialState: {
    sessionToken: null
  },
  reducers: {
    setSessionToken: (state, action) => {
      const sessionTokenObj = {
        group: action.payload.session.group,
        accessToken: action.payload.session.accessToken
      };
      const desSessionToken = deserialize(SessionToken, sessionTokenObj);
      state.sessionToken = serialize(desSessionToken);
    },
    clearSessionToken(state) {
      state.sessionToken = null;
    }
  }
});

export const { setSessionToken, clearSessionToken } = sessionTokenSlice.actions;
export default sessionTokenSlice.reducer;
