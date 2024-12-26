import { createSelector } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

import Committee from "@/models/Committee";

const selectCommitteeState = (state) => state.committee.committee;

const selectCommittee = createSelector(
  [selectCommitteeState],
  (stateCommittee) => {
    return stateCommittee ? deserialize(Committee, stateCommittee) : null;
  }
);

export default selectCommittee;
