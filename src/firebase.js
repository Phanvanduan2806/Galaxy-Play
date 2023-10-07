// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage} from 'firebase/storage';
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFuQonvY-M6WQXSCaahrWGl79k6MbYBrk",
  authDomain: "film-d73c5.firebaseapp.com",
  projectId: "film-d73c5",
  storageBucket: "film-d73c5.appspot.com",
  messagingSenderId: "943324009960",
  appId: "1:943324009960:web:cc2355285db231ac9a005d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();