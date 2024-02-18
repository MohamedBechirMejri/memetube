import { authSig } from "../signals/user";

const auth = authSig.value;

export const signOut = () => {
  if (auth) auth.signOut();
};
