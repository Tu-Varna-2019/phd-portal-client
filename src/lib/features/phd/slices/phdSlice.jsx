import Phd from "@/models/Phd";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

export const phdSlice = createSlice({
  name: "phd",
  initialState: {
    phd: new Phd()
  },
  reducers: {
    setPhd: (state, action) => {
      const response = action.payload.response;

      const phdObj = {
        oid: response.idTokenClaims.oid,
        name: response.idTokenClaims.name,
        email: response.idTokenClaims.email,
        accessToken: response.accessToken
      };
      state.phd = deserialize(Phd, phdObj);
    },
    clearPhd(state) {
      state.phd = null;
    }
  }
});

export const { setPhd, clearPhd } = phdSlice.actions;
export default phdSlice.reducer;
