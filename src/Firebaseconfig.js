import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyATq7CIm2EEqs7bvguehEViYaMwZlG17uU",
  authDomain: "asset-management-dc794.firebaseapp.com",
  projectId: "asset-management-dc794",
  storageBucket: "asset-management-dc794.appspot.com",
  messagingSenderId: "342771563415",
  appId: "1:342771563415:web:dfc5f1fb5d00bac08362d2",
  measurementId: "G-GRHV49051S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth= getAuth(app);
const provider= new GoogleAuthProvider();
export {auth, provider};