/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

interface User {
    accessToken: string;
    // Add other properties if needed
}

const firebaseConfig = {
    apiKey: "AIzaSyAxLGjqOfCa9lRvG_spyswBPNZFkObCrPI",
    authDomain: "thedailytech-b0eaa.firebaseapp.com",
    projectId: "thedailytech-b0eaa",
    storageBucket: "thedailytech-b0eaa.appspot.com",
    messagingSenderId: "489379174865",
    appId: "1:489379174865:web:8d90fe94b20b631b6de8f0",
    measurementId: "G-V421427TCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Google Auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

// Sign in with Google
export const authWithGoogle = async (): Promise<User | null> => {

    let user = null;

    await signInWithPopup(auth, provider)
        .then((result) => {
            user = result.user;

            // The signed
        })
        .catch((error) => {
            console.log(error);
            // ...
        });

    return user;
}