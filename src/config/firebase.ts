import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDw9OqGELJBxOdqhbS45JtKbaHQ2V_IMhs",
  authDomain: "goala-todolist.firebaseapp.com",
  projectId: "goala-todolist",
  storageBucket: "goala-todolist.firebasestorage.app",
  messagingSenderId: "474448473514",
  appId: "1:474448473514:web:14b13e81ddfd7357810fd3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
