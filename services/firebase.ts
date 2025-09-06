
// Import the functions you need from the SDKs you need
// FIX: Switched to Firebase v8 compatibility API to resolve module export errors.
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMf988MAPb7q6kkm-I_Fs0zm16kmHeqdI",
  authDomain: "arstateapp.firebaseapp.com",
  projectId: "arstateapp",
  storageBucket: "arstateapp.firebasestorage.app",
  messagingSenderId: "950018744224",
  appId: "1:950018744224:web:017a34a682f595e0128ec5"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
