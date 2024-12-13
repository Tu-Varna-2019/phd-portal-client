import User from "@/entities/User";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: new User().toJSON()
  },
  reducers: {
    setUser: (state, action) => {
      console.info(
        `Reducer for user: ${JSON.stringify(action.payload, null, 2)}`
      );

      const user = new User({
        id: action.payload.response.idTokenClaims.oid,
        username: action.payload.response.idTokenClaims.name,
        email: action.payload.response.idTokenClaims.email
      });
      state.user = user.toJSON();
    },
    clearUser(state) {
      state.user = new User().toJSON();
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
