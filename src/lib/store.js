import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/lib/features/user/userSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { createTransform } from "redux-persist";
import User from "@/entities/User";

const userTransform = createTransform(
  (user) => {
    return {
      ...user,
      user: inboundState.user ? inboundState.user.toJSON() : {}
    };
  },
  (user) => {
    // Transform the state before persisting
    if (user.user && !user.user.id) {
      return {
        ...user,
        user: new User(user.user)
      };
    }
    return user;
  },
  { whitelist: ["user"] }
);

const persistConfig = {
  key: "root",
  storage,
  transform: [userTransform]
};

export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer)
  },
  devTools: process.env.NODE_ENV != "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
      }
    })
});

export const persistor = persistStore(store);
