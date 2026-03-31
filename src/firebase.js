// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxAbc9htbvQznKfNcnPSkeI7M3AUjCEfY",
  authDomain: "internstack-4d068.firebaseapp.com",
  projectId: "internstack-4d068",
  storageBucket: "internstack-4d068.firebasestorage.app",
  messagingSenderId: "824322136105",
  appId: "1:824322136105:web:dab576d97aed5f99312438",
  measurementId: "G-SQGSDM30W4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);