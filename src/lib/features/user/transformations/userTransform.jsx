"use client";
// NOTE: Not used anywhere
import { createTransform } from "redux-persist";
import User from "@/entities/User";

export const userTransform = createTransform(
  (incomingState) => {
    const user = new User(incomingState.user);
    user.extractName(incomingState.user.name);
    console.log(`transform: ${user.printName()}`);

    return {
      user: user
    };
  },
  (state) => {
    const user = new User(incomingState.user);
    user.extractName(incomingState.user.name);
    console.log(`transform: ${user.printName()}`);

    return {
      ...state,
      user: new User(state.user)
    };
  },
  { whitelist: ["user"] }
);
