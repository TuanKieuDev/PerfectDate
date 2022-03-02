// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDfZxn_vjG1RXz5C-EMJBqk8kWeFlq6e-w",
  authDomain: "perfectdate-5f812.firebaseapp.com",
  projectId: "perfectdate-5f812",
  storageBucket: "perfectdate-5f812.appspot.com",
  messagingSenderId: "235587720796",
  appId: "1:235587720796:web:fe8b7b152a3e8bc9577899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth();
export const db = getFirestore(app);