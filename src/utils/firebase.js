// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzWoxe5ZFyl0ABHNtmW3WlA3rz8Ow2phY",
    authDomain: "netflixgpt-c8a5f.firebaseapp.com",
    projectId: "netflixgpt-c8a5f",
    storageBucket: "netflixgpt-c8a5f.appspot.com",
    messagingSenderId: "525424268627",
    appId: "1:525424268627:web:1d5c487ddfc352ed80bda6",
    measurementId: "G-QKC0Z35HP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const auth = getAuth();