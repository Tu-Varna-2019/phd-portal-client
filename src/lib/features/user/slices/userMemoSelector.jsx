import User from "@/entities/User";
import { createSelector } from "@reduxjs/toolkit";

const selectUserState = (state) => state.user.user;

const selectUser = createSelector([selectUserState], (stateUser) => {
  return stateUser ? User.fromJSON(stateUser) : null;
});

export default selectUser;
