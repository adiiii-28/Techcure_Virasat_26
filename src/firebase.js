// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaC5EF6l-QG_TvbU94mhhoxBBNOZsb7yA",
  authDomain: "techcure-c7693.firebaseapp.com",
  projectId: "techcure-c7693",
  storageBucket: "techcure-c7693.firebasestorage.app",
  messagingSenderId: "235951397464",
  appId: "1:235951397464:web:fc34b4694d7161b607082d",
  measurementId: "G-GWEXSHWKFQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Auth Export
export const auth = getAuth(app);
export default app;