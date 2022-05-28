// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-EYP8zJINS8cs-1U_kTrCgi-H5b0b45Y",
  authDomain: "housie-app-8072e.firebaseapp.com",
  projectId: "housie-app-8072e",
  storageBucket: "housie-app-8072e.appspot.com",
  messagingSenderId: "553365330304",
  appId: "1:553365330304:web:e7480d51a9ce8f5568c965",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
