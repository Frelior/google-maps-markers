// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBz6vZhVtoValHz8N4P0c3Jlhq64e-U5C0",
  authDomain: "maps-markers-40215.firebaseapp.com",
  databaseURL:
    "https://maps-markers-40215-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "maps-markers-40215",
  storageBucket: "maps-markers-40215.appspot.com",
  messagingSenderId: "703750761283",
  appId: "1:703750761283:web:8186af2015c44d902b5df6",
  measurementId: "G-ERJKTBP568",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
export { database }
