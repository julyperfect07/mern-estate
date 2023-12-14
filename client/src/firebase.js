// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d46e1.firebaseapp.com",
  projectId: "mern-estate-d46e1",
  storageBucket: "mern-estate-d46e1.appspot.com",
  messagingSenderId: "544658323761",
  appId: "1:544658323761:web:da36fa9cd1d3181dc91810",
  measurementId: "G-HP9WTR3S60"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
