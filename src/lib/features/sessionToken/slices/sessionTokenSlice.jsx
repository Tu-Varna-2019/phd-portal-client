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
        accessToken: action.payload.session.accessToken,
        group: action.payload.session.group
      };

      const desSessionToken = deserialize(SessionToken, sessionTokenObj);
      state.sessionToken = serialize(desSessionToken);
    },

    setAccessToken(state, action) {
      state.sessionToken = { accessToken: action.payload };
    },
    clearSessionToken(state) {
      state.sessionToken = null;
    }
  }
});

export const { setSessionToken, clearSessionToken, setAccessToken } =
  sessionTokenSlice.actions;
export default sessionTokenSlice.reducer;
