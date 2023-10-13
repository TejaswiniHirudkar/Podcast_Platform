// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzK19Hh1ap2_dh7r5QyC96tzHhX5nIN6I",
  authDomain: "podcast-platform-app-7c843.firebaseapp.com",
  projectId: "podcast-platform-app-7c843",
  storageBucket: "podcast-platform-app-7c843.appspot.com",
  messagingSenderId: "1020859492360",
  appId: "1:1020859492360:web:1f33527ea7ea90dcbf49bd",
  measurementId: "G-DJM0TCLEEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {auth, db, storage};