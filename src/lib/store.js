import { configureStore } from "@reduxjs/toolkit";
import phdReducer from "@/features/phd/slices/phdSlice";
import sessionTokenReducer from "@/features/sessionToken/slices/sessionTokenSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { PERSIST, REHYDRATE } from "redux-persist";
import doctoralCenterReducer from "@/features/doctoralCenter/slices/doctoralCenterSlice";
import committeeReducer from "@/features/committee/slices/committeeSlice";

const sessionTokenPersistConfig = {
  key: "sessionToken",
  storage,
  whitelist: ["sessionToken"]
};

const doctoralCenterPersistConfig = {
  key: "doctoralCenter",
  storage,
  whitelist: ["doctoralCenter"]
  // BUG: Not working for some magical reason
  // transform: [doctoralCenterTransform]
};

const phdPersistConfig = {
  key: "phd",
  storage,
  whitelist: ["phd"]
};

const committeePersistConfig = {
  key: "committee",
  storage,
  whitelist: ["committee"]
};

export const store = configureStore({
  reducer: {
    phd: persistReducer(phdPersistConfig, phdReducer),
    doctoralCenter: persistReducer(
      doctoralCenterPersistConfig,
      doctoralCenterReducer
    ),
    committee: persistReducer(committeePersistConfig, committeeReducer),
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
