import Committee from "@/models/Committee";
import DoctoralCenter, {
  DEFAULT_DOCTORALCENTER_IMAGE
} from "@/models/DoctoralCenter";
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
      if (DoctoralCenter.isDefaultImageNameEQ(doctoralCenterObj.picture)) {
        doctoralCenterObj.pictureBlob = "/" + DEFAULT_DOCTORALCENTER_IMAGE;
      }

      state.doctoralCenter = serialize(doctoralCenterObj);
    }
  }
});

export const { setPhd, setCommittee, setDoctoralCenter } = userSlice.actions;
export default userSlice.reducer;
