import { collection, getDocs, getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "memetube-235ca.firebaseapp.com",
  databaseURL:
    "https://memetube-235ca-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "memetube-235ca",
  storageBucket: "memetube-235ca.appspot.com",
  messagingSenderId: "509507528790",
  appId: "1:509507528790:web:ad60349f58cebdb684f3f7",
  measurementId: "G-E56TEEC76E",
};

export const getCollection = async (db: any, collectionName: string) => {
  return await getDocs(collection(db, collectionName));
};
