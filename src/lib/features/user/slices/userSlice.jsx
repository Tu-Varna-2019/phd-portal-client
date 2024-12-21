import User from "@/entities/User";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: new User()
  },
  reducers: {
    setUser: (state, action) => {
      const response = action.payload.response;

      const user = new User({
        oid: response.idTokenClaims.oid,
        name: response.idTokenClaims.name,
        email: response.idTokenClaims.email,
        accessToken: response.accessToken
      });
      state.user = user.toJSON();
    },
    clearUser(state) {
      state.user = new User();
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
