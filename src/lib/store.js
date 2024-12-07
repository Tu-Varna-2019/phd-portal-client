import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/slices/userSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { PERSIST, REHYDRATE } from "redux-persist";

const persistConfig = {
  key: "root",
  storage
  // BUG: Not working for some magical reason
  // transform: [userTransform]
};

export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer)
  },
  devTools: process.env.NODE_ENV != "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
        ignoredPaths: ["payload.response.account.tenantProfiles"]
      },
      extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
          customEntityAdapter.removeAll(state);
        });
      }
    })
});

export const persistor = persistStore(store);
