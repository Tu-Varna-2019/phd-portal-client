import { createSelector } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

import Phd from "@/models/Phd";

const selectPhdState = (state) => state.phd.phd;

const selectPhd = createSelector([selectPhdState], (statePhd) => {
  return statePhd instanceof Phd ? statePhd : deserialize(Phd, statePhd);
});

export default selectPhd;
