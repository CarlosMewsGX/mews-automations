import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace these values with your Firebase project config
// Go to console.firebase.google.com → your project → Project settings → Your apps
const firebaseConfig = {
  apiKey: "AIzaSyBmJKl6TqUpCfvUlJ2F-_3OFyYBNHZ9z_Y",
  authDomain: "automations-6fa65.firebaseapp.com",
  projectId: "automations-6fa65",
  storageBucket: "automations-6fa65.firebasestorage.app",
  messagingSenderId: "956608585760",
  appId: "1:956608585760:web:b5eb16748b29ec93191c45",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
