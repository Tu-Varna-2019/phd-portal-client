import Committee from "@/models/Committee";
import DoctoralCenter from "@/models/DoctoralCenter";
import Phd from "@/models/Phd";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize, serialize } from "serializr";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    // NOTE: needed to putt null value due to non-serializable errors if otherwise
    phd: null,
    committee: null,
    doctoralCenter: null
  },
  reducers: {
    setPhd: (state, action) => {
      const phdObj = deserialize(Phd, action.payload.data);
      state.phd = serialize(phdObj);
    },
    setCommittee: (state, action) => {
      const committeeObj = deserialize(Committee, action.payload.data);
      state.committee = serialize(committeeObj);
    },
    setDoctoralCenter: (state, action) => {
      const doctoralCenterObj = deserialize(
        DoctoralCenter,
        action.payload.data
      );
      state.doctoralCenter = serialize(doctoralCenterObj);
    },

    clearPhd(state) {
      state.phd = null;
    },

    clearCommittee(state) {
      state.committee = null;
    },

    clearDoctoralCenter(state) {
      state.doctoralCenter = null;
    }
  }
});

export const {
  setPhd,
  setCommittee,
  setDoctoralCenter,
  clearPhd,
  clearCommittee,
  clearDoctoralCenter
} = userSlice.actions;
export default userSlice.reducer;
