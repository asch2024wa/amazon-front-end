// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz3LO6MG22hRqcwuVYJPn3s9hxaCZ9dpU",
  authDomain: "project1-90347.firebaseapp.com",
  projectId: "project1-90347",
  storageBucket: "project1-90347.firebasestorage.app",
  messagingSenderId: "59887419383",
  appId: "1:59887419383:web:ebadc124f6059c8ab9f8f2",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebase.firestore();
