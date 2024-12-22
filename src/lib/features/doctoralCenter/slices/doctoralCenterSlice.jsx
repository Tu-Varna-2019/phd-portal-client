import DoctoralCenter from "@/models/DoctoralCenter";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

export const doctoralCenterSlice = createSlice({
  name: "doctoralCenter",
  initialState: {
    user: new DoctoralCenter()
  },
  reducers: {
    setDoctoralCenter: (state, action) => {
      // TODO: Change to map the resposne attrs via api routers
      const response = action.payload.response;

      const doctoralCenterObj = {
        oid: response.idTokenClaims.oid,
        name: response.idTokenClaims.name,
        email: response.idTokenClaims.email,
        accessToken: response.accessToken
      };
      state.doctoralCenter = deserialize(DoctoralCenter, doctoralCenterObj);
    },
    clearDoctoralCenter(state) {
      state.doctoralCenter = null;
    }
  }
});

export const { setDoctoralCenter, clearDoctoralCenter } =
  doctoralCenterSlice.actions;
export default doctoralCenterSlice.reducer;
