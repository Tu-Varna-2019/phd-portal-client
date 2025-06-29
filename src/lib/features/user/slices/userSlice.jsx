import Candidate from "@/models/Candidate";
import Committee from "@/models/Committee";
import DoctoralCenter from "@/models/DoctoralCenter";
import Phd from "@/models/Phd";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize, serialize } from "serializr";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    // NOTE: needed to put null value due to non-serializable errors if otherwise
    phd: null,
    committee: null,
    doctoralCenter: null,
    candidate: null
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
    setCandidate: (state, action) => {
      const candidateObj = deserialize(Candidate, action.payload.data);
      state.candidate = serialize(candidateObj);
    },

    clearPhd(state) {
      state.phd = null;
    },

    clearCommittee(state) {
      state.committee = null;
    },

    clearDoctoralCenter(state) {
      state.doctoralCenter = null;
    },

    clearCandidate(state) {
      state.candidate = null;
    },

    clearAll: () => ({
      phd: null,
      committee: null,
      doctoralCenter: null,
      candidate: null
    })
  }
});

export const {
  setPhd,
  setCommittee,
  setDoctoralCenter,
  setCandidate,
  clearPhd,
  clearCommittee,
  clearDoctoralCenter,
  clearCandidate,
  clearAll
} = userSlice.actions;
export default userSlice.reducer;
