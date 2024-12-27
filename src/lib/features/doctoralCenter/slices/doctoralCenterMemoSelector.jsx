import { createSelector } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

import DoctoralCenter from "@/models/DoctoralCenter";

const selectDoctoralCenterState = (state) =>
  state.doctoralCenter.doctoralCenter;

const selectDoctoralCenter = createSelector(
  [selectDoctoralCenterState],
  (stateDoctoralCenter) => {
    return stateDoctoralCenter
      ? deserialize(DoctoralCenter, stateDoctoralCenter)
      : null;
  }
);

export default selectDoctoralCenter;
