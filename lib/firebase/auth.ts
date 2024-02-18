import { getAuth } from "firebase/auth";

export const signOut = () => {
  const auth = getAuth();
  auth.signOut();
};
