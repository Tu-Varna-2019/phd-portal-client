import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "@/features/user/slices/userSlice";
import uiStateReducer from "@/features/uiState/slices/uiStateSlice";
import sessionTokenReducer from "@/features/sessionToken/slices/sessionTokenSlice";
import notificationsReducer from "@/features/notification/slices/notificationsSlice";

const rootCombineReducer = combineReducers({
  uiState: uiStateReducer,
  sessionToken: sessionTokenReducer,
  notifications: notificationsReducer,
  user: userReducer
});

export const rootReducer = (state, action) => {
  if (action.type == "CLEAR") {
    state = {};
  }
  return rootCombineReducer(state, action);
};
