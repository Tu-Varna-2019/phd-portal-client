import { createSelector } from "@reduxjs/toolkit";
import { deserialize } from "serializr";

import User from "@/models/User";

const selectUserState = (state) => state.user.user;

const selectUser = createSelector([selectUserState], (stateUser) => {
  return stateUser ? deserialize(User, stateUser) : null;
});

export default selectUser;
