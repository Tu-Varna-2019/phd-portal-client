import DoctoralCenter from "@/models/DoctoralCenter";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize, serialize } from "serializr";

export const doctoralCenterSlice = createSlice({
  name: "doctoralCenter",
  initialState: {
    doctoralCenter: null
  },
  reducers: {
    setDoctoralCenter: (state, action) => {
      const doctoralCenterObj = deserialize(
        DoctoralCenter,
        action.payload.data
      );
      state.doctoralCenter = serialize(doctoralCenterObj);
    },
    clearDoctoralCenter(state) {
      state.doctoralCenter = null;
    }
  }
});

export const { setDoctoralCenter, clearDoctoralCenter } =
  doctoralCenterSlice.actions;
export default doctoralCenterSlice.reducer;
