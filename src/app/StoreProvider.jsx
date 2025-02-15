"use client";

import { Provider } from "react-redux";
import { persistor, store } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";
import LoadingPageCircle from "@/components/loading/LoadingPageCircle";

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingPageCircle />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
