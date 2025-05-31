import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "web-carros-6326b.firebaseapp.com",
  projectId: "web-carros-6326b",
  storageBucket: "web-carros-6326b.firebasestorage.app",
  messagingSenderId: "99666656666",
  appId: "1:99666656666:web:234c8b5ac06db37b800e23",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
