import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: "todo-app-react-76a99.firebaseapp.com",
  projectId: "todo-app-react-76a99",
  storageBucket: "todo-app-react-76a99.appspot.com",
  messagingSenderId: "646441163787",
  appId: process.env.REACT_APP_ID,
  measurementId: "G-QEC1YLCXTJ"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
