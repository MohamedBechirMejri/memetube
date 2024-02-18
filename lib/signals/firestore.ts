import { signal } from "@preact/signals-react";
import { getFirestore } from "firebase/firestore";

export const dbSig = signal(getFirestore());
