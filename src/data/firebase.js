// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDwR93BM8fNCSWL6qyRbU_5OXsdP7PI9A",
  authDomain: "sharescreen-c520c.firebaseapp.com",
  projectId: "sharescreen-c520c",
  storageBucket: "sharescreen-c520c.appspot.com",
  messagingSenderId: "680102199048",
  appId: "1:680102199048:web:53099d7093921e30a176bd",
  measurementId: "G-HSLHM1HK0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
