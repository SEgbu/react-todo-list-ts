import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebase = initializeApp({
    apiKey: "AIzaSyDLeKt-zntfFs0Y7u-92gafFmi22rIB8j4",
    authDomain: "react-todo-list-ts.firebaseapp.com",
    projectId: "react-todo-list-ts",
    storageBucket: "react-todo-list-ts.appspot.com",
    messagingSenderId: "199902989374",
    appId: "1:199902989374:web:08e26dd757f86e5d5d956f",
    measurementId: "G-9JV0E5SDQP"
});

export const auth = getAuth(firebase);

export const firestore = getFirestore(firebase);