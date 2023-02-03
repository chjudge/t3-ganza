import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyCMBiGTO4aonjMeoM6CgY_kdBNQPvyR7_w",
  
    authDomain: "ganza-app.firebaseapp.com",
  
    projectId: "ganza-app",
  
    storageBucket: "ganza-app.appspot.com",
  
    messagingSenderId: "765247608781",
  
    appId: "1:765247608781:web:e5eb814e52e41ef381d684"
  
  };
  

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

