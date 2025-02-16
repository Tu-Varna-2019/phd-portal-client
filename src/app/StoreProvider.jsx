"use client";

import { Provider } from "react-redux";
import { persistor, store } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./loading";

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
