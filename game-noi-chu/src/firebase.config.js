// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApIrvY4gekaJymcKPEWWCZYxN5JO3YkU8",
  authDomain: "game-noi-chu-nhh.firebaseapp.com",
  databaseURL: "https://game-noi-chu-nhh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "game-noi-chu-nhh",
  storageBucket: "game-noi-chu-nhh.appspot.com",
  messagingSenderId: "37502804667",
  appId: "1:37502804667:web:bdb4a703929d44fe76bf9e",
  measurementId: "G-W9BNTD4CBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// get db
const db = getFirestore(app);

export { db };