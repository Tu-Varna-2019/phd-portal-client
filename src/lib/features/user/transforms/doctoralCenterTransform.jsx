"use client";
// NOTE: Not used anywhere
import { createTransform } from "redux-persist";
import DoctoralCenter from "@/entities/DoctoralCenter";

export const doctoralCenterTransform = createTransform(
  (incomingState) => {
    const doctoralCenter = new DoctoralCenter(incomingState.doctoralCenter);
    doctoralCenter.extractName(incomingState.doctoralCenter.name);
    console.log(`transform: ${doctoralCenter.printName()}`);

    return {
      doctoralCenter: doctoralCenter
    };
  },
  (state) => {
    const doctoralCenter = new DoctoralCenter(incomingState.doctoralCenter);
    doctoralCenter.extractName(incomingState.doctoralCenter.name);
    console.log(`transform: ${doctoralCenter.printName()}`);

    return {
      ...state,
      doctoralCenter: new DoctoralCenter(state.doctoralCenter)
    };
  },
  { whitelist: ["doctoralCenter"] }
);
