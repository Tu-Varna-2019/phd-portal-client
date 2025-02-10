import { createSelector } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

import Phd from "@/models/Phd";
import Committee from "@/models/Committee";
import DoctoralCenter from "@/models/DoctoralCenter";

const selectPhdState = (state) => state.user.phd;
const selectCommitteeState = (state) => state.user.committee;
const selectDoctoralCenterState = (state) => state.user.doctoralCenter;

export const selectPhd = createSelector([selectPhdState], (statePhd) => {
  return statePhd ? deserialize(Phd, statePhd) : new Phd();
});

export const selectCommittee = createSelector(
  [selectCommitteeState],
  (stateCommittee) => {
    return stateCommittee
      ? deserialize(Committee, stateCommittee)
      : new Committee();
  }
);

export const selectDoctoralCenter = createSelector(
  [selectDoctoralCenterState],
  (stateDoctoralCenter) => {
    return stateDoctoralCenter
      ? deserialize(DoctoralCenter, stateDoctoralCenter)
      : new DoctoralCenter();
  }
);
