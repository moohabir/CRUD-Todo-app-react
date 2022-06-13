import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDzUwrO5R_Dp3fiNMINTCN6l3RWZ-1Y2L0",
  authDomain: "todo-app-react-76a99.firebaseapp.com",
  projectId: "todo-app-react-76a99",
  storageBucket: "todo-app-react-76a99.appspot.com",
  messagingSenderId: "646441163787",
  appId: "1:646441163787:web:1ccb2ea12cd0620d533b0e",
  measurementId: "G-QEC1YLCXTJ"
});
const db = firebaseApp.firestore();

export default db;
