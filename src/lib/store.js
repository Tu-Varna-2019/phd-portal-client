import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/slices/userSlice";
import uiStateReducer from "@/features/uiState/slices/uiStateSlice";
import sessionTokenReducer from "@/features/sessionToken/slices/sessionTokenSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { PERSIST, REHYDRATE } from "redux-persist";
import notificationsReducer from "@/features/notification/slices/notificationsSlice";

const sessionTokenPersistConfig = {
  key: "sessionToken",
  storage,
  whitelist: ["sessionToken"]
};

const notificationsPersistConfig = {
  key: "notifications",
  storage,
  whitelist: ["notifications"]
};

const uiStatePersistConfig = {
  key: "uiState",
  storage,
  whitelist: ["alertBoxOpen", "alertBoxMessage", "alertBoxSeverity"]
};

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["phd", "committee", "doctoralCenter", "candidate"]
  // BUG: Not working for some magical reason
  // transform: [doctoralCenterTransform]
};

export const store = configureStore({
  reducer: {
    uiState: persistReducer(uiStatePersistConfig, uiStateReducer),
    notifications: persistReducer(
      notificationsPersistConfig,
      notificationsReducer
    ),
    user: persistReducer(userPersistConfig, userReducer),
    sessionToken: persistReducer(sessionTokenPersistConfig, sessionTokenReducer)
  },

  /* eslint-disable no-undef */
  devTools: process.env.NODE_ENV != "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
        ignoredActionPaths: ["meta.arg", "payload.response"]
      },
      extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
          customEntityAdapter.removeAll(state);
        });
      }
    })
});

export const persistor = persistStore(store);
