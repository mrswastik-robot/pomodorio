// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwMRVggzRHbsKcfq5q_vF4I0M2H1HgeZo",
  authDomain: "pomodorio-3df85.firebaseapp.com",
  projectId: "pomodorio-3df85",
  storageBucket: "pomodorio-3df85.appspot.com",
  messagingSenderId: "556816024483",
  appId: "1:556816024483:web:318499acb262098403d016",
  measurementId: "G-0QPNT2J739"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);