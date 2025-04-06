// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const firebaseConfig = {
  apiKey,
  authDomain: "ai-planner-79517.firebaseapp.com",
  projectId: "ai-planner-79517",
  storageBucket: "ai-planner-79517.firebasestorage.app",
  messagingSenderId: "595719371619",
  appId: "1:595719371619:web:65b73852680fccebc73156",
  measurementId: "G-YMP7L6H0E9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);