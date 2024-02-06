// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-authentication-f93ac.firebaseapp.com",
  projectId: "mern-authentication-f93ac",
  storageBucket: "mern-authentication-f93ac.appspot.com",
  messagingSenderId: "509014945487",
  appId: "1:509014945487:web:21de47ec909076043fd1ba",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
