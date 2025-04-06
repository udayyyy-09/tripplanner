// src/service/firebaseconfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config with environment variable for API key
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

const firebaseConfig = {
  apiKey,
  authDomain: "ai-planner-79517.firebaseapp.com",
  projectId: "ai-planner-79517",
  storageBucket: "ai-planner-79517.appspot.com", // <-- fixed here
  messagingSenderId: "595719371619",
  appId: "1:595719371619:web:65b73852680fccebc73156",
  measurementId: "G-YMP7L6H0E9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
