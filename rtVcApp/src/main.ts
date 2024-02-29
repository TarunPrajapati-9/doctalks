import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDk4gKQp8Tfb_uYoI33ZeUhP6fSRo78gGs",
  authDomain: "doctalks-424da.firebaseapp.com",
  projectId: "doctalks-424da",
  storageBucket: "doctalks-424da.appspot.com",
  messagingSenderId: "899339016121",
  appId: "1:899339016121:web:4e06986127084cb7fa4868",
  measurementId: "G-KDD9VLWRRE",
};

if (!firebase.getApps().length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase;
//TODO 4:35 video
// https://www.youtube.com/watch?v=WmR9IMUD_CY&t=34s
