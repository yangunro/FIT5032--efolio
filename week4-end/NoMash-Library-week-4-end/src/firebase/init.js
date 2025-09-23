// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV3MgWAeIIxOQiPD43kIrmyuCLdRpljSc",
  authDomain: "fit5032-efolio-6f8e8.firebaseapp.com",
  projectId: "fit5032-efolio-6f8e8",
  storageBucket: "fit5032-efolio-6f8e8.firebasestorage.app",
  messagingSenderId: "130027200930",
  appId: "1:130027200930:web:d7405c06b30f53386012fb"
};

// Initialize Firebase
initializeApp(firebaseConfig)

const db = getFirestore()
export default db