// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMhfTRF5HoCkcANjO1Os_9JVZx2AdcGUI",
  authDomain: "my-first-project-c632c.firebaseapp.com",
  projectId: "my-first-project-c632c",
  storageBucket: "my-first-project-c632c.appspot.com",
  messagingSenderId: "923056995215",
  appId: "1:923056995215:web:5d4c574dc1e6133d3529fa",
  measurementId: "G-R6P6SMY6NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Assign the object to a variable
const firebaseServices = { auth, db };

// Export the object as the default export of the module
export default firebaseServices;
