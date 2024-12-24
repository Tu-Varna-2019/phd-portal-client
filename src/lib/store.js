import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/slices/userSlice";
import phdReducer from "@/features/phd/slices/phdSlice";
import sessionTokenReducer from "@/features/sessionToken/slices/sessionTokenSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { PERSIST, REHYDRATE } from "redux-persist";
import doctoralCenterReducer from "@/features/doctoralCenter/slices/doctoralCenterSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
  // BUG: Not working for some magical reason
  // transform: [userTransform]
};

const sessionTokenPersistConfig = {
  key: "sessionToken",
  storage,
  whitelist: ["sessionToken"]
};

const doctoralCenterPersistConfig = {
  key: "doctoralCenter",
  storage,
  whitelist: ["doctoralCenter"]
};

const phdPersistConfig = {
  key: "phd",
  storage,
  whitelist: ["phd"]
};

export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer),
    phd: persistReducer(phdPersistConfig, phdReducer),
    doctoralCenter: persistReducer(
      doctoralCenterPersistConfig,
      doctoralCenterReducer
    ),
    sessionToken: persistReducer(sessionTokenPersistConfig, sessionTokenReducer)
  },
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
