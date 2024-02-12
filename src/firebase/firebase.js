import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fullstack-social-links-card.firebaseapp.com",
  projectId: "fullstack-social-links-card",
  storageBucket: "fullstack-social-links-card.appspot.com",
  messagingSenderId: "605033295548",
  appId: "1:605033295548:web:b987f429f660afb864aab9",
  measurementId: "G-S4LXBWV6MP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app)
const auth = getAuth(app);

export { app, auth, db, storage };