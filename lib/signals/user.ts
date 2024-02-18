import { signal } from "@preact/signals-react";
import { getAuth } from "firebase/auth";

export const userSig = signal<any>({});

export const authSig = signal(getAuth());
