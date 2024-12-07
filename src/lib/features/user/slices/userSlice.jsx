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
        id: response.idTokenClaims.oid,
        email: response.idTokenClaims.email,
        accessToken: response.accessToken
      });

      user.extractName(response.idTokenClaims.name);
      state.user = user.toJSON();
    },
    clearUser(state) {
      state.user = new User().toJSON();
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
