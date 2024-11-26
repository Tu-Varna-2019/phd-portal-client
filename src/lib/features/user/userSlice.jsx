import User from "@/entities/User";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: User
  },
  reducers: {
    setUser: (state, action) => {
      console.info(
        `Reducer for user: ${JSON.stringify(action.payload, null, 2)}`
      );

      state.user = new User({
        id: action.payload.response.idTokenClaims.oid,
        username: action.payload.response.idTokenClaims.name,
        email: action.payload.response.idTokenClaims.email
      });
    },
    clearUser(state) {
      state.user = new User();
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
