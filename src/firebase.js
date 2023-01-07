import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKYumznAvCNlzoBuPlh0KOuVthbFUkFWA",
  authDomain: "fit-clan-ac424.firebaseapp.com",
  projectId: "fit-clan-ac424",
  storageBucket: "fit-clan-ac424.appspot.com",
  messagingSenderId: "732634308887",
  appId: "1:732634308887:web:1b9eafb96d8523233f9752"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

export default db; 

export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged}

