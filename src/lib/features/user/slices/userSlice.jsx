import User from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";
import { deserialize, serialize } from "serializr";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      const userObj = {
        oid: action.payload.userInfo.oid,
        name: action.payload.userInfo.name,
        email: action.payload.userInfo.email
      };

      const desUser = deserialize(User, userObj);
      state.user = serialize(desUser);
    },
    clearUser(state) {
      state.user = null;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
