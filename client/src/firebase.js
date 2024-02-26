import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  // eslint-disable-next-line no-undef
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "learnblog-f8f4b.firebaseapp.com",
  projectId: "learnblog-f8f4b",
  storageBucket: "learnblog-f8f4b.appspot.com",
  messagingSenderId: "575727661683",
  appId: "1:575727661683:web:ac144b3fce157efb47f006",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
