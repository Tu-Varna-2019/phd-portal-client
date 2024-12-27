import Committee from "@/models/Committee";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize, serialize } from "serializr";

export const committeeSlice = createSlice({
  name: "committee",
  initialState: {
    committee: null
  },
  reducers: {
    setCommittee: (state, action) => {
      const committeeObj = deserialize(Committee, action.payload.data);
      state.committee = serialize(committeeObj);
    },
    clearCommittee(state) {
      state.committee = null;
    }
  }
});

export const { setCommittee, clearCommittee } = committeeSlice.actions;
export default committeeSlice.reducer;
