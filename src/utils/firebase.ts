// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "techbichitra-6229f.firebaseapp.com",
  projectId: "techbichitra-6229f",
  storageBucket: "techbichitra-6229f.appspot.com",
  messagingSenderId: "475555412295",
  appId: "1:475555412295:web:9169902c8bfd25ab6d3462",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
